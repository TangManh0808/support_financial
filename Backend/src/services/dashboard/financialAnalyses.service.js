const db = require("../../config/knex");
const {
  incomeStatementService,
} = require("../dashboard/incomeStatement.service");

module.exports = async ({ month, year, company_id }) => {
  if (!month || !year) {
    throw new Error("Thiếu tháng hoặc năm khi truy vấn phân tích tài chính");
  }

  // 1. Gọi incomeStatement để lấy lợi nhuận sau thuế
  const incomeStatement = await incomeStatementService({
    company_id,
    month,
    year,
  });

  const netProfit = incomeStatement?.data?.netProfit || 0;

  // 2. Lấy financial_inputs để tính tổng tài sản
  const rows = await db("financial_inputs")
    .select("field", db.raw("SUM(value) as total"))
    .where({ company_id })
    .andWhereRaw("month(created_at) = ?", [month])
    .andWhereRaw("year(created_at) = ?", [year])
    .groupBy("field");

  const map = Object.fromEntries(rows.map((r) => [r.field, Number(r.total)]));
  // 3. Lấy doanh thu từ bảng transactions
  const revenueResult = await db("transactions")
    .where({ company_id, type: "revenue", status: "paid" })
    .whereRaw("month(date) = ? AND year(date) = ?", [month, year])
    .sum({ revenue: "amount" })
    .first();

  const revenue = parseFloat(revenueResult.revenue || 0);
  // 4. Gọi incomeStatement để lấy Giá vốn
  const costOfGoodsSold = incomeStatement?.data?.costOfGoodsSold || 0;
  // biên lợi nhuận gộp
  const grossProfitMargin =
    revenue !== 0 ? (revenue - costOfGoodsSold) / revenue : 0;

  const totalAssets =
    (map.cash_on_hand || 0) +
    (map.bank_balance || 0) +
    (map.receivables || 0) +
    (map.inventory || 0) +
    (map.fixed_assets || 0) +
    (map.long_term_investments || 0);

  const equity =
    (map.capital_contribution || 0) +
    (map.retained_earnings || 0) +
    (map.reserves || 0);
  // roe = lợi nhuận sau thuế / vốn chủ sở hữu
  const roe = equity !== 0 ? netProfit / equity : 0;

  const totalDebt = (map.short_term_debt || 0) + (map.long_term_debt || 0);

  const currentRatio =
    map.short_term_debt !== 0
      ? (map.cash_on_hand || 0) +
        (map.bank_balance || 0) +
        (map.receivables || 0) / map.short_term_debt
      : 0;

  return {
    ROA: totalAssets !== 0 ? netProfit / totalAssets : 0,
    ROE: roe,
    TyLeNo: totalAssets !== 0 ? totalDebt / totalAssets : 0,
    TyLeThanhToanHienHanh: currentRatio,
    VongQuayHangTonKho: map.inventory !== 0 ? revenue / map.inventory : 0,
    VongQuayTaiSan: totalAssets !== 0 ? revenue / totalAssets : 0,
    BienLoiNhuanRong: revenue !== 0 ? netProfit / revenue : 0,
    BienLoiNhuanGop: grossProfitMargin,
  };
};
