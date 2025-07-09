const {
  getExpenseBreakdown,
} = require("../../../services/dashboard/expenseDetail.service");

exports.getBreakdown = async (req, res) => {
  try {
    const companyId = req.user.company_id;
    const year = parseInt(req.query.year) || new Date().getFullYear();

    const data = await getExpenseBreakdown(companyId, year);

    res.json({ data });
  } catch (err) {
    console.error("Lỗi getBreakdown:", err);
    res.status(500).json({ error: "Lỗi khi lấy chi phí theo năm" });
  }
};
