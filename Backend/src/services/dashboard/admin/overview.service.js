const db = require("../../../config/knex");

exports.getOverview = async () => {
  const totalUsers = await db("users").count("id as count").first();
  const totalCompanies = await db("companies").count("id as count").first();
  const totalCategories = await db("transaction_categories")
    .count("id as count")
    .first();
  const totalTransactions = await db("transactions")
    .count("id as count")
    .first();

  return {
    totalUsers: +totalUsers.count,
    totalCompanies: +totalCompanies.count,
    totalCategories: +totalCategories.count,
    totalTransactions: +totalTransactions.count,
  };
};
