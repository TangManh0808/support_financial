// src/services/settings/changePassword.service.js
const db = require("../../../config/knex");
const bcrypt = require("bcryptjs");

exports.changePassword = async ({ userId, currentPassword, newPassword }) => {
  const user = await db("users").where("id", userId).first();

  if (!user) {
    throw new Error("Người dùng không tồn tại");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Mật khẩu hiện tại không đúng");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await db("users")
    .where("id", userId)
    .update({ password: hashedNewPassword });

  return true;
};
