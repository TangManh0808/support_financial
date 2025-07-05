const reportsService = require("../services/report.service");
const checkOwnership = require("../utils/checkOwnership");

module.exports.getAll = async function (req, res) {
  try {
    let result = await reportsService.getAll();

    // Phân quyền
    if (req.user.role !== "admin") {
      result = result.filter((r) => r.company_id === req.user.company_id);
    }

    // Xử lý parse JSON
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
    console.error("Lỗi từ reportsController:", error);
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred",
    });
  }
};

module.exports.getOne = async function (req, res) {
  try {
    const { id } = req.params;
    const result = await reportsService.getOne(id);

    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy báo cáo" });
    }

    if (!checkOwnership(result.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền truy cập báo cáo này" });
    }

    result.data_json =
      typeof result.data_json === "string"
        ? JSON.parse(result.data_json)
        : result.data_json;

    res.json({
      result,
      message: "Get one report successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred",
    });
  }
};

module.exports.createOne = async function (req, res) {
  try {
    const { company_id, user_id, month, year, type, data_json } = req.body;

    if (!checkOwnership(company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không thể tạo báo cáo cho công ty khác" });
    }

    const result = await reportsService.createOne(
      company_id,
      user_id,
      month,
      year,
      type,
      data_json
    );

    res.status(201).json({
      result,
      message: "Create one report successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred",
    });
  }
};

module.exports.updateOne = async function (req, res) {
  try {
    const { id } = req.params;
    const report = await reportsService.getOne(id);

    if (!report) {
      return res.status(404).json({ message: "Không tìm thấy báo cáo" });
    }

    if (!checkOwnership(report.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền sửa báo cáo này" });
    }

    const { company_id, user_id, month, year, type, data_json } = req.body;

    await reportsService.updateOne(
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
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred",
    });
  }
};

module.exports.deleteOne = async function (req, res) {
  try {
    const { id } = req.params;
    const report = await reportsService.getOne(id);

    if (!report) {
      return res.status(404).json({ message: "Không tìm thấy báo cáo" });
    }

    if (!checkOwnership(report.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền xoá báo cáo này" });
    }

    await reportsService.deleteOne(id);

    res.json({
      message: "Delete one report successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      message: "Error occurred",
    });
  }
};
