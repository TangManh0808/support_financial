const knex = require("../../config/knex");

exports.getStatus = async (company_id) => {
  const unpaidRevenues = await knex("transactions")
    .select("id", "date", "description", "amount")
    .where({
      company_id,
      type: "revenue",
      status: "unpaid",
    })
    .orderBy("date", "desc");

  const totalReceivable = unpaidRevenues.reduce(
    (sum, tx) => sum + parseFloat(tx.amount),
    0
  );

  return {
    totalReceivable,
    unpaidTransactions: unpaidRevenues,
  };
};
