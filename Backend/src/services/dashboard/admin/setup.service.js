const db = require("../../../config/knex");
const bcrypt = require("bcrypt");

module.exports.createInitialAdmin = async (email, password) => {
  // Kiểm tra đã có admin chưa
  const adminExists = await db("users").where("role", "admin").first();
  if (adminExists) {
    return {
      success: false,
      code: 403,
      message: "Admin đã tồn tại. Không thể tạo thêm qua API này.",
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo admin
  await db("users").insert({
    email,
    password: hashedPassword,
    role: "admin",
    company_id: null,
    created_at: new Date(),
  });

  return {
    success: true,
    code: 200,
    message: "Tạo admin đầu tiên thành công ✅",
  };
};
