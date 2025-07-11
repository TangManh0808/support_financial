const db = require("../config/knex");

module.exports.getFilteredTransactions = async ({
  company_id,
  month,
  year,
  search,
  page,
  limit,
}) => {
  const query = db("transactions")
    .select(
      "transactions.*",
      "transaction_categories.name as category_name",
      "transaction_categories.type as category_type"
    )
    .leftJoin(
      "transaction_categories",
      "transactions.category_id",
      "transaction_categories.id"
    )
    .where("transactions.company_id", company_id);

  if (month) {
    query.andWhereRaw("MONTH(transactions.date) = ?", [month]);
  }

  if (year) {
    query.andWhereRaw("YEAR(transactions.date) = ?", [year]);
  }

  if (search) {
    query.andWhere("transactions.description", "like", `%${search}%`);
  }

  return await query
    .orderBy("transactions.date", "desc")
    .limit(limit)
    .offset((page - 1) * limit);
};

module.exports.getTotalTransactions = async ({
  company_id,
  month,
  year,
  search,
}) => {
  const query = db("transactions")
    .count("id as total")
    .where("company_id", company_id);

  if (month) {
    query.andWhereRaw("MONTH(date) = ?", [month]);
  }

  if (year) {
    query.andWhereRaw("YEAR(date) = ?", [year]);
  }

  if (search) {
    query.andWhere("description", "like", `%${search}%`);
  }

  const result = await query.first();
  return Number(result.total);
};
module.exports.getOne = async function (id) {
  return await db("transactions").where("id", +id).first();
};

module.exports.createOne = async function (
  company_id,
  user_id,
  category_id,
  type,
  date,
  amount,
  description
) {
  let result = await db("transactions").insert([
    {
      company_id: company_id,
      user_id: user_id,
      category_id: category_id,
      type: type,
      date: date,
      amount: amount,
      description: description,
    },
  ]);
};
module.exports.updateOne = async function (
  id,
  company_id,
  user_id,
  category_id,
  type,
  date,
  amount,
  description
) {
  return await db("transactions").where("id", +id).update({
    company_id: company_id,
    user_id: user_id,
    category_id: category_id,
    type: type,
    date: date,
    amount: amount,
    description: description,
  });
};
module.exports.deleteOne = async function (id) {
  return await db("transactions").where("id", +id).del();
};
