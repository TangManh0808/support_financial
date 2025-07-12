const userService = require("../../../../services/dashboard/settings/users.service");



exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getByCompany(req.user.company_id);
    res.json(users);
  } catch (error) {
    console.error("Lỗi lấy danh sách user:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const company_id = req.user.company_id;
    const userData = req.body;
    await userService.create({ ...userData, company_id });
    res.json({ message: "Tạo người dùng thành công" });
  } catch (error) {
    console.error("Lỗi tạo user:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const targetUser = await userService.getById(id);
    if (!targetUser || targetUser.company_id !== req.user.company_id) {
      return res.status(403).json({ message: "Không có quyền sửa user này" });
    }

    await userService.update(id, updateData);
    res.json({ message: "Cập nhật người dùng thành công" });
  } catch (error) {
    console.error("Lỗi cập nhật user:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const targetUser = await userService.getById(id);

    if (!targetUser || targetUser.company_id !== req.user.company_id) {
      return res.status(403).json({ message: "Không có quyền xoá user này" });
    }

    await userService.delete(id);
    res.json({ message: "Xoá người dùng thành công" });
  } catch (error) {
    console.error("Lỗi xoá user:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


