// src/controllers/settings/changePassword.controller.js
const changePasswordService = require("../../../../services/dashboard/settings/changePassword.service");

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Thiếu mật khẩu" });
    }

    await changePasswordService.changePassword({
      userId,
      currentPassword,
      newPassword,
    });

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
