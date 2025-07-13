const {
  generateIncomeStatementExcel,
} = require("../../services/dashboard/exportIncomStatement.service");

exports.exportIncomeStatement = async (req, res) => {
  try {
    const company_id = req.user?.company_id;
    const { month, year } = req.query;

    if (!company_id || !month || !year) {
      return res.status(400).json({ message: "Thiếu tham số" });
    }

    const { filePath } = await generateIncomeStatementExcel({
      company_id,
      month,
      year,
    });
    const fileName = `income_statement_${company_id}_${month}_${year}.xlsx`;
    res.download(filePath, fileName);
  } catch (error) {
    console.error("❌ Lỗi export income statement:", error);
    res
      .status(500)
      .json({ message: "Lỗi export báo cáo", error: error.message });
  }
};
