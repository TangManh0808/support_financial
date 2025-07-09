const knex = require("../../config/knex");

exports.getChartData = async ({ type = "monthly", year, from, to, company_id }) => {
  let labelExpr = "";
  let groupByExpr = "";

  switch (type) {
    case "yearly":
      labelExpr = knex.raw("YEAR(date) AS label");
      groupByExpr = knex.raw("YEAR(date)");
      break;
    case "monthly":
      labelExpr = knex.raw("DATE_FORMAT(date, '%Y-%m') AS label");
      groupByExpr = knex.raw("DATE_FORMAT(date, '%Y-%m')");
      break;
    case "daily":
    default:
      labelExpr = knex.raw("DATE(date) AS label");
      groupByExpr = knex.raw("DATE(date)");
      break;
  }

  const query = knex("transactions")
    .select(labelExpr)
    .sum({
      totalRevenue: knex.raw("CASE WHEN type = 'revenue' THEN amount ELSE 0 END"),
      totalExpense: knex.raw("CASE WHEN type = 'expense' THEN amount ELSE 0 END"),
    })
    .where("company_id", company_id)
    .groupBy(groupByExpr)
    .orderBy(groupByExpr);

  if (year) {
    query.andWhereRaw("YEAR(date) = ?", [year]);
  }

  if (from && to) {
    query.andWhereBetween("date", [from, to]);
  }

  const results = await query;

  // Tính netCashflow từng dòng
  return results.map(row => ({
    ...row,
    netCashflow: parseFloat(row.totalRevenue) - parseFloat(row.totalExpense),
  }));
};
