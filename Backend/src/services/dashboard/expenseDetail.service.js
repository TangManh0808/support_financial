const knex = require("../../config/knex");

exports.getExpenseBreakdown = async (companyId, year) => {
  const rows = await knex("transactions as t")
    .leftJoin("transaction_categories as c", "t.category_id", "c.id")
    .select(
      knex.raw("MONTH(t.date) as month"),
      "c.name as category",
      knex.raw("SUM(t.amount) as total")
    )
    .where("t.company_id", companyId)
    .andWhere("t.type", "expense")
    .andWhereRaw("YEAR(t.date) = ?", [year])
    .groupByRaw("MONTH(t.date), c.name")
    .orderBy(["month", "category"]);

  return rows.map((row) => ({
    month: row.month,
    category: row.category || "Không rõ",
    total: Number(row.total),
  }));
};
