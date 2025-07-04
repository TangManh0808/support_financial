const db = require("..//config/knex");
const companyService = require("..//services/company.service");
module.exports.getAll = async function (req, res) {
  try {
    let result = await companyService.getAll();
    res.json({
      result,
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
    let result = await companyService.updateOne(
      id,
      name,
      tax_code,
      address,
      email,
      phone
    );
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
    let result = await companyService.deleteOne(id);
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
