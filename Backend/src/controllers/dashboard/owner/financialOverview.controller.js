const db = require("../../../config/knex");

exports.getOverview = async (req, res) => {
  const { company_id } = req.user;
  const { month, year } = req.query;

  if (!company_id || !month || !year) {
    return res.status(400).json({ message: "Thiếu tham số" });
  }

  try {
    // 1. Lấy các chỉ số từ financial_inputs
    const inputs = await db("financial_inputs")
      .select("field", db.raw("SUM(value) as total"))
      .where({ company_id })
      .andWhere("month", month)
      .andWhere("year", year)
      .groupBy("field");

    const inputMap = {};
    inputs.forEach((row) => {
      inputMap[row.field] = Number(row.total) || 0;
    });

    // 2. Lấy tổng doanh thu và chi phí từ bảng transactions
    const transactions = await db("transactions")
      .select("type")
      .sum({ total: "amount" })
      .where({ company_id })
      .andWhereRaw("MONTH(date) = ?", [month])
      .andWhereRaw("YEAR(date) = ?", [year])
      .groupBy("type");

    let revenue = 0;
    let expense = 0;

    transactions.forEach((row) => {
      if (row.type === "revenue") revenue = Number(row.total);
      if (row.type === "expense") expense = Number(row.total);
    });

    // 3. Tính các chỉ số cần trả về
    const data = {
      total: (inputMap.cash_on_hand || 0) + (inputMap.bank_balance || 0),
      cash: inputMap.cash_on_hand || 0,
      bank: inputMap.bank_balance || 0,
      receivable: inputMap.receivables || 0,
      payable: (inputMap.short_term_debt || 0) + (inputMap.long_term_debt || 0),
      revenue,
      expense,
      profit: revenue - expense,
      inventory: inputMap.inventory || 0,
    };

    res.json({ data });
  } catch (error) {
    console.error("Lỗi getOverview:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
