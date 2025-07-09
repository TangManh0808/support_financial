const db = require("../../../config/knex"); // Knex instance

exports.getOverview = async (req, res) => {
  const { company_id } = req.user;
  const { month, year } = req.query;

  // console.log(company_id, month, year);

  try {
    // 1. Lấy financial_inputs
    const inputs = await db("financial_inputs")
      .select("field", "value")
      .where({ company_id, month, year });

    const inputMap = {};
    inputs.forEach((row) => {
      inputMap[row.field] = Number(row.value) || 0;
    });

    // 2. Lấy tổng doanh thu & chi phí
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

    const data = {
      total: (inputMap.cash_on_hand || 0) + (inputMap.bank_balance || 0),
      cash: inputMap.cash_on_hand || 0,
      bank: inputMap.bank_balance || 0,
      receivable: 100, // ❗ giả sử: sau này sẽ làm rõ (ví dụ tạo thêm bảng công nợ)
      payable: 50, // ❗ như trên
      revenue,
      expense,
      profit: revenue - expense,
      inventory: inputMap.inventory || 0, // ❗ nếu không có trường này thì bỏ
    };

    res.json({ data });
  } catch (error) {
    console.error("Lỗi getOverview:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
