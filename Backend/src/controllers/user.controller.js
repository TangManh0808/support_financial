const db = require("..//config/knex");
const userService = require("..//services/user.service");
module.exports.getAll = async function (req, res) {
  try {
    let result = await userService.getAll();
    res.json({
      result,
      message: "Get all users successfully",
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
    let result = await userService.getOne(id);
    res.json({
      id: id,
      result,
      message: "Get one user successfully",
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
    let { company_id, name, email, password, role } = req.body;
    let result = await userService.createOne(
      company_id,
      name,
      email,
      password,
      role
    );
    res.json({
      result,
      message: "Create one user successfully",
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
    let { company_id, name, email, password, role } = req.body;
    // console.log(company_id, name, email, password, role);
    let result = await userService.updateOne(
      id,
      company_id,
      name,
      email,
      password,
      role
    );
    res.json({
      message: "Update one user successfully",
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
    let result = await userService.deleteOne(id);
    res.json({
      message: "Delete one user successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
