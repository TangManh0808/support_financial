const {
  incomeStatementService,
} = require("../../../services/dashboard/incomeStatement.service");

exports.getIncomeStatement = async (req, res) => {
  try {
    const { month, year } = req.query;
    const company_id = req.user.company_id;
    // console.log(year);
    // console.log(req.user.company_id);

    const result = await incomeStatementService({ company_id, month, year });
    console.log(result);
    res.json({
      data: result,
      message: "Lấy báo cáo kết quả kinh doanh thành công",
    });
  } catch (error) {
    console.error("Lỗi khi lấy báo cáo kết quả kinh doanh:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
