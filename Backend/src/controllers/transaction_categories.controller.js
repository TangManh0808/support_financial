const db = require("..//config/knex");
const transaction_categoriesService = require("..//services/transaction_categories.service");
const checkOwnership = require("../utils/checkOwnership");

module.exports.getAll = async function (req, res) {
  try {
    let result = await transaction_categoriesService.getAll();
    console.log(result);
    const filtered =
      req.user.role === "admin"
        ? result
        : result.filter((c) => c.company_id === req.user.company_id);
    res.json({ result: filtered });
  } catch (error) {
    res.json({
      error,
      message: "Error occured",
    });
  }
};
module.exports.getOne = async function (req, res) {
  try {
    let { id } = req.params;
    const category = await transaction_categoriesService.getOne(id);
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });

    if (!checkOwnership(category.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền truy cập danh mục này" });
    }

    res.json({ result: category });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
module.exports.createOne = async function (req, res) {
  try {
    let { company_id, name, type } = req.body;
    if (!checkOwnership(company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không được tạo danh mục cho công ty khác" });
    }
    let result = await transaction_categoriesService.createOne(
      company_id,
      name,
      type
    );
    res.json({
      result,
      message: "Create one transaction_category successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
module.exports.updateOne = async function (req, res) {
  try {
    const { id } = req.params;
    const { company_id, name, type } = req.body;

    const category = await transaction_categoriesService.getOne(id);
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });

    if (!checkOwnership(category.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền sửa danh mục này" });
    }

    await transaction_categoriesService.updateOne(id, company_id, name, type);

    res.json({
      message: "Cập nhật danh mục thành công",
    });
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật danh mục:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
module.exports.deleteOne = async function (req, res) {
  try {
    const { id } = req.params;

    const category = await transaction_categoriesService.getOne(id);
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });

    if (!checkOwnership(category.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền xoá danh mục này" });
    }

    await transaction_categoriesService.deleteOne(id);

    res.json({
      message: "Xoá danh mục thành công",
    });
  } catch (error) {
    console.error("❌ Lỗi khi xoá danh mục:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
