const db = require("..//config/knex");
const transaction_categoriesService = require("..//services/transaction_categories.service");
module.exports.getAll = async function (req, res) {
  try {
    let result = await transaction_categoriesService.getAll();
    res.json({
      result,
      message: "Get all transaction_categoriess successfully",
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
    let result = await transaction_categoriesService.getOne(id);
    res.json({
      id: id,
      result,
      message: "Get one transaction_category successfully",
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
    let { company_id, name, type } = req.body;
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
    let { id } = req.params;
    let { company_id, name, type } = req.body;

    let result = await transaction_categoriesService.updateOne(
      id,
      company_id,
      name,
      type
    );
    res.json({
      message: "Update one transaction_category successfully",
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
    let result = await transaction_categoriesService.deleteOne(id);
    res.json({
      message: "Delete one transaction_categories successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
