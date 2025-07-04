const db = require("..//config/knex");
const transactionService = require("..//services/transaction.service");
module.exports.getAll = async function (req, res) {
  try {
    let result = await transactionService.getAll();
    res.json({
      result,
      message: "Get all transactions successfully",
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
    let result = await transactionService.getOne(id);
    res.json({
      id: id,
      result,
      message: "Get one transaction successfully",
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
    let { company_id, user_id, category_id, type, date, amount, description } =
      req.body;
    let result = await transactionService.createOne(
      company_id,
      user_id,
      category_id,
      type,
      date,
      amount,
      description
    );
    res.json({
      result,
      message: "Create one transaction successfully",
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
    let { company_id, user_id, category_id, type, date, amount, description } =
      req.body;
    // console.log(company_id, name, email, password, role);
    let result = await transactionService.updateOne(
      id,
      company_id,
      user_id,
      category_id,
      type,
      date,
      amount,
      description
    );
    res.json({
      message: "Update one transaction successfully",
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
    let result = await transactionService.deleteOne(id);
    res.json({
      message: "Delete one transaction successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
