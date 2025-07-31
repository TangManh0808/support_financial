const db = require("../../../config/knex");

exports.getOverview = async (year) => {
  const totalUsers = await db("users").count("id as count").first();
  const totalCompanies = await db("companies").count("id as count").first();
  const totalCategories = await db("transaction_categories").count("id as count").first();
  const totalTransactions = await db("transactions").count("id as count").first();

  const currentYear = year || new Date().getFullYear();
  const monthlyCompanies = await db("companies")
    .select(db.raw("MONTH(created_at) as month"), db.raw("COUNT(*) as count"))
    .whereRaw("YEAR(created_at) = ?", [currentYear])
    .groupByRaw("MONTH(created_at)")
    .orderBy("month", "asc");

  const companiesByMonth = Array.from({ length: 12 }, (_, i) => {
    const found = monthlyCompanies.find((m) => m.month === i + 1);
    return { month: i + 1, count: found ? found.count : 0 };
  });

  return {
    totalUsers: +totalUsers.count,
    totalCompanies: +totalCompanies.count,
    totalCategories: +totalCategories.count,
    totalTransactions: +totalTransactions.count,
    companiesByMonth,
  };
};
