const revenueExpenseService = require("../../../services/dashboard/revenueExpense.service");

exports.getChartData = async (req, res) => {
  const { month, year } = req.query;
  const companyId = req.user.company_id;
    
  try {
    const data = await revenueExpenseService.getRevenueExpense(
      companyId,
      month,
      year
    );
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
};
