const jwt = require("jsonwebtoken");
const db = require("../config/knex");
const secret = process.env.JWT_SECRET || "your_jwt_secret";

exports.createCompany = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { name, tax_code, email, address, phone } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ message: "Thiếu thông tin công ty" });
    }

    // 1. Tạo công ty mới
    const [company_id] = await db("companies").insert({
      name,
      tax_code,
      email,
      address,
      phone,
    });

    // 2. Cập nhật người dùng với company_id mới
    await db("users").where({ id: userId }).update({ company_id });

    // 3. Lấy lại thông tin người dùng mới sau khi cập nhật
    const updatedUser = await db("users").where({ id: userId }).first();

    // 4. Tạo token mới với company_id đã cập nhật
    const token = jwt.sign(
      {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        company_id: updatedUser.company_id,
      },
      secret,
      { expiresIn: "1d" }
    );

    // 5. Trả kết quả về client
    res.status(201).json({
      message: "Tạo công ty thành công",
      company_id,
      user: updatedUser,
      token,
    });

  } catch (error) {
    console.error("Lỗi setupCompanyFirst:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
