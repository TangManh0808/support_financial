const cashflowService = require("../../../services/dashboard/cashflow.service");

exports.getChartData = async (req, res) => {
  try {
    const { type = "monthly", year, from, to } = req.query;
    const company_id = req.user.company_id;

    const data = await cashflowService.getChartData({
      type,
      year,
      from,
      to,
      company_id,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Lỗi lấy dữ liệu cashflow:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
