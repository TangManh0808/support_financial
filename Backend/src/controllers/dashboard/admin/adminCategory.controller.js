const categoryService = require("../../../services/dashboard/admin/adminCategory.service");

exports.getAll = async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const data = await categoryService.getAllCategories({ page, limit, search });
    res.json({ success: true, data });
  } catch (err) {
    console.error("Lỗi getAll categories:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

exports.delete = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (err) {
    console.error("Lỗi delete category:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, type } = req.body;
    await categoryService.updateCategory(req.params.id, { name, type });
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (err) {
    console.error("Lỗi update category:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
