const db = require("../config/knex");
const financial_inputService = require("../services/financial_input.service");
const checkOwnership = require("../utils/checkOwnership");

module.exports.getAll = async function (req, res) {
  try {
    const { month, year } = req.query;

    let result = await financial_inputService.getAll({ month, year });

    const filtered =
      req.user.role === "admin"
        ? result
        : result.filter((i) => i.company_id === req.user.company_id);

    res.json({
      result: filtered,
      message: "Get all financial_inputs successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error occurred",
    });
  }
};

module.exports.getOne = async function (req, res) {
  try {
    let { id } = req.params;
    let result = await financial_inputService.getOne(id);
    if (!result)
      return res.status(404).json({ message: "Không tìm thấy dữ liệu" });

    if (!checkOwnership(result.company_id, req)) {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
    res.json({
      id: id,
      result,
      message: "Get one financial_input successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error",
    });
  }
};

module.exports.createOne = async function (req, res) {
  try {
    let { company_id, month, year, field, value, note } = req.body;
    const user_id = req.user.id;

    if (!checkOwnership(company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không được thêm dữ liệu cho công ty khác" });
    }

    let result = await financial_inputService.createOne(
      company_id,
      user_id,
      month,
      year,
      field,
      value,
      note
    );

    res.json({
      result,
      message: "Create one financial_input successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error",
    });
  }
};

module.exports.updateOne = async function (req, res) {
  try {
    let { id } = req.params;
    let { company_id, month, year, field, value, note } = req.body;
    const user_id = req.user.id;

    const input = await financial_inputService.getOne(id);
    if (!input)
      return res.status(404).json({ message: "Không tìm thấy dữ liệu" });

    if (!checkOwnership(input.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền sửa dữ liệu này" });
    }

    await financial_inputService.updateOne(
      id,
      company_id,
      user_id,
      month,
      year,
      field,
      value,
      note
    );

    res.json({
      message: "Update one financial_input successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error",
    });
  }
};

module.exports.deleteOne = async function (req, res) {
  try {
    let { id } = req.params;
    const input = await financial_inputService.getOne(id);
    if (!input)
      return res.status(404).json({ message: "Không tìm thấy dữ liệu" });

    if (!checkOwnership(input.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền xoá dữ liệu này" });
    }

    await financial_inputService.deleteOne(id);
    res.json({
      message: "Delete one financial_input successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error",
    });
  }
};
