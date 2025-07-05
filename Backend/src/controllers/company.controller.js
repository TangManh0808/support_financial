const db = require("..//config/knex");
const companyService = require("..//services/company.service");
const checkOwnership = require("../utils/checkOwnership");

module.exports.getAll = async function (req, res) {
  try {
    let result = await companyService.getAll();

    const filtered =
      req.user.role === "admin"
        ? result
        : result.filter((c) => c.id === req.user.company_id);

    res.json({
      result: filtered,
      message: "Get all companies successfully",
    });
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
    let result = await companyService.getOne(id);
    console.log(result.id);

    if (!result)
      return res.status(404).json({ message: "Không tìm thấy công ty" });

    if (!checkOwnership(result.id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền truy cập công ty này" });
    }
    res.json({
      id: id,
      result,
      message: "Get one company successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
module.exports.createOne = async function (req, res) {
  try {
    let { name, tax_code, address, email, phone } = req.body;
    let result = await companyService.createOne(
      name,
      tax_code,
      address,
      email,
      phone
    );
    res.json({
      result,
      message: "Create one company successfully",
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
    let { id } = req.params;
    let { name, tax_code, address, email, phone } = req.body;
    const company = await companyService.getOne(id);

    if (!company)
      return res.status(404).json({ message: "Không tìm thấy công ty" });

    if (!checkOwnership(company.id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền sửa công ty này" });
    }
    await companyService.updateOne(id, name, tax_code, address, email, phone);
    res.json({
      message: "Update one company successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
module.exports.deleteOne = async function (req, res) {
  try {
    let { id } = req.params;
    const company = await companyService.getOne(id);

    if (!company)
      return res.status(404).json({ message: "Không tìm thấy công ty" });

    if (!checkOwnership(company.id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền xoá công ty này" });
    }
    await companyService.deleteOne(id);
    res.json({
      message: "Delete one company successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
