const setupService = require("../../../services/dashboard/admin/setup.service");

module.exports.initializeAdmin = async (req, res) => {
  try {
    const { email, password, secret } = req.body;

    // Kiểm tra SECRET
    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ message: "Không có quyền truy cập" });
    }

    // Gọi service tạo admin
    const result = await setupService.createInitialAdmin(email, password);
    if (!result.success) {
      return res.status(result.code).json({ message: result.message });
    }

    return res.json({ message: result.message });
  } catch (error) {
    console.error("Lỗi tạo admin:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
