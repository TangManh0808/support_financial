const db = require("..//config/knex");
const reportsService = require("..//services/report.service");
module.exports.getAll = async function (req, res) {
  try {
    let result = await reportsService.getAll();
    result = result.map((r) => ({
      ...r,
      data_json:
        typeof r.data_json === "string"
          ? JSON.parse(r.data_json)
          : r.data_json || null,
    }));
    res.json({
      result,
      message: "Get all reports successfully",
    });
  } catch (error) {
    console.error("Lỗi từ reportsController:", error); // Ghi log ra console
    res.status(500).json({
      error: error.message || error, // In lỗi cụ thể
      message: "Error occured",
    });
  }
};
module.exports.getOne = async function (req, res) {
  try {
    let { id } = req.params;
    let result = await reportsService.getOne(id);
    if (result && result.data_json) {
      result.data_json = JSON.parse(result.data_json);
    }
    res.json({
      id: id,
      result,
      message: "Get one report successfully",
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
    let { company_id, user_id, month, year, type, data_json } = req.body;
    let result = await reportsService.createOne(
      company_id,
      user_id,
      month,
      year,
      type,
      data_json
    );
    res.json({
      result,
      message: "Create one report successfully",
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
    let { company_id, user_id, month, year, type, data_json } = req.body;
    // console.log(company_id, name, email, password, role);
    let result = await reportsService.updateOne(
      id,
      company_id,
      user_id,
      month,
      year,
      type,
      data_json
    );
    res.json({
      message: "Update one report successfully",
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
    let result = await reportsService.deleteOne(id);
    res.json({
      message: "Delete one report successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
