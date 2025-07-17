const db = require("../../../config/knex");
const bcrypt = require("bcrypt");

module.exports.createAdmin = async (email, password, ip) => {
  // Check duplicate email
  const existing = await db("users").where("email", email).first();
  if (existing) {
    return {
      success: false,
      code: 409,
      message: "Email đã tồn tại",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [adminId] = await db("users").insert({
    email,
    password: hashedPassword,
    role: "admin",
    company_id: null,
    created_at: new Date(),
  });

  // ✅ Ghi log theo bảng activity_logs chuẩn
  await db("activity_logs").insert({
    company_id: null,
    user_id: adminId,
    action: "Tạo admin nội bộ",
    target_table: "users",
    target_id: adminId,
    message: `Super admin được tạo nội bộ từ IP ${ip}`,
    created_at: new Date(),
  });

  return {
    success: true,
    code: 201,
    message: "Tạo super admin thành công ✅",
    
    adminId, // ✅ Trả lại để controller dùng tạo token
  };
};
