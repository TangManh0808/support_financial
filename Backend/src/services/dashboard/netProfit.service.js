const db = require("../../config/knex");

exports.getNetProfit = async (companyId, month, year) => {
  const results = await db("transactions")
    .select(db.raw("MONTH(date) AS month"))
    .sum({
      revenue: db.raw("CASE WHEN type = 'revenue' THEN amount ELSE 0 END"),
    })
    .sum({
      expense: db.raw("CASE WHEN type = 'expense' THEN amount ELSE 0 END"),
    })
    .where({ company_id: companyId })
    .andWhereRaw("YEAR(date) = ?", [year])
    .groupByRaw("MONTH(date)")
    .orderBy("month");

  // Khởi tạo đủ 12 tháng, mặc định 0
  const fullYearData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const found = results.find((r) => r.month === month);
    const revenue = Number(found?.revenue || 0);
    const expense = Number(found?.expense || 0);
    return {
      month,
      revenue,
      expense,
      profit: revenue - expense,
    };
  });

  return fullYearData;
};
