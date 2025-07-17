const internalService = require("../../../services/dashboard/admin/internal.service");
const jwt = require("jsonwebtoken"); // ✅ Thêm dòng này

module.exports.createSuperAdmin = async (req, res) => {
  try {
    // 1. Không cho chạy trong môi trường production
    if (process.env.NODE_ENV === "production") {
      return res
        .status(403)
        .json({ message: "Route bị vô hiệu hóa trong môi trường production" });
    }

    // 2. Chỉ cho phép IP nội bộ
    const ip = req.ip || req.connection.remoteAddress;
    const allowedIPs = ["::1", "127.0.0.1", "::ffff:127.0.0.1"];
    if (!allowedIPs.includes(ip)) {
      return res.status(403).json({ message: "Chỉ cho phép gọi từ localhost" });
    }

    // 3. Lấy body
    const { email, password, secret } = req.body;

    // 4. Kiểm tra bí mật
    if (secret !== process.env.ADMIN_SECRET) {
      return res
        .status(401)
        .json({ message: "Không có quyền tạo admin nội bộ" });
    }

    // 5. Gọi service xử lý và ghi log
    const result = await internalService.createAdmin(email, password, ip);

    if (!result.success) {
      return res.status(result.code).json({ message: result.message });
    }

    // ✅ Tạo token để trả về
    const token = jwt.sign(
      {
        id: result.adminId,
        email,
        role: "admin",
        company_id: null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: result.message,
      token,
    });
  } catch (error) {
    console.error("❌ Lỗi khi tạo super admin:", error);
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};
