const db = require("../../config/knex");

const incomeStatementService = async ({ company_id, month, year }) => {
  const rows = await db("financial_inputs")
    .select("field", db.raw("SUM(value) as total"))
    .where({ company_id })
    .andWhereRaw("MONTH(created_at) = ?", [month])
    .andWhereRaw("YEAR(created_at) = ?", [year])
    .groupBy("field");

  const result = Object.fromEntries(
    rows.map((row) => [row.field, Number(row.total)])
  );

  const revenue = result.revenue || 0;
  const costOfGoodsSold = result.cost_of_goods_sold || 0;
  const sellingExpenses = result.selling_expenses || 0;
  const adminExpenses = result.admin_expenses || 0;
  const depreciation = result.depreciation || 0;
  const leasingCosts = result.leasing_costs || 0;
  const corporateTax = result.corporate_tax || 0;

  const grossProfit = revenue - costOfGoodsSold;
  const operatingProfit =
    grossProfit - sellingExpenses - adminExpenses - depreciation - leasingCosts;
  const netProfit = operatingProfit - corporateTax;

  return {
    revenue,
    costOfGoodsSold,
    grossProfit,
    sellingExpenses,
    adminExpenses,
    depreciation,
    leasingCosts,
    operatingProfit,
    corporateTax,
    netProfit,
  };
};

module.exports = incomeStatementService;
