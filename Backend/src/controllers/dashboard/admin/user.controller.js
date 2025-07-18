const adminUserService = require("../../../services/dashboard/admin/user.service");

exports.getAllUsers = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const data = await adminUserService.getAllUsers({ search, page, limit });
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const updated = await adminUserService.toggleUserStatus(req.params.id);
    res.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await adminUserService.deleteUser(req.params.id);
    res.json({ success: true, message: "Xoá tài khoản thành công" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
