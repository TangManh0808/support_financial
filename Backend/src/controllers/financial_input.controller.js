const db = require("../config/knex");
const financial_inputService = require("../services/financial_input.service");
module.exports.getAll = async function (req, res) {
  try {
    let result = await financial_inputService.getAll();
    res.json({
      result,
      message: "Get all financial_inputs successfully",
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
    let result = await financial_inputService.getOne(id);
    res.json({
      id: id,
      result,
      message: "Get one financial_input successfully",
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
    let { company_id, user_id, month, field, value, note } = req.body;
    let result = await financial_inputService.createOne(
      company_id,
      user_id,
      month,
      field,
      value,
      note
    );
    res.json({
      result,
      message: "Create one financial_input successfully",
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
    let { company_id, user_id, month, field, value, note } = req.body;
    let result = await financial_inputService.updateOne(
      id,
      company_id,
      user_id,
      month,
      field,
      value,
      note
    );
    res.json({
      message: "Update one financial_input successfully",
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
    let result = await financial_inputService.deleteOne(id);
    res.json({
      message: "Delete one financial_input successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
