// src/controllers/dashboard/owner/financialAnalyses.controller.js
const financialAnalysesService = require("../../../services/dashboard/financialAnalyses.service");

exports.getFinancialAnalyses = async (req, res) => {
  try {
    const { month, year } = req.query;
    const company_id = req.user.company_id;

    const data = await financialAnalysesService({ month, year, company_id });
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi tính chỉ số phân tích:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};