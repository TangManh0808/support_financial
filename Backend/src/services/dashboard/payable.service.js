const knex = require("../../config/knex");

exports.getStatus = async (company_id) => {
  const unpaidTransactions = await knex("transactions")
    .select("id", "date", "description", "amount")
    .where({
      company_id,
      type: "expense",
      status: "unpaid",
    })
    .orderBy("date", "desc");

  const totalPayable = unpaidTransactions.reduce(
    (sum, tx) => sum + parseFloat(tx.amount),
    0
  );

  return {
    totalPayable,
    unpaidTransactions,
  };
};
