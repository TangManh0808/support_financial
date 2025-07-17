const db = require("../config/knex");

module.exports.getAll = async function ({ month, year }) {
  let query = db("financial_inputs").select("*");

  if (month) query.where("month", +month);
  if (year) query.where("year", +year);

  return await query;
};

module.exports.getOne = async function (id) {
  return await db("financial_inputs").where("id", +id).first();
};

module.exports.createOne = async function (
  company_id,
  user_id,
  month,
  year,
  field,
  value,
  note
) {
  return await db("financial_inputs").insert([
    {
      company_id,
      user_id,
      month,
      year,
      field,
      value,
      note,
    },
  ]);
};

module.exports.updateOne = async function (
  id,
  company_id,
  user_id,
  month,
  year,
  field,
  value,
  note
) {
  return await db("financial_inputs").where("id", +id).update({
    company_id,
    user_id,
    month,
    year,
    field,
    value,
    note,
  });
};

module.exports.deleteOne = async function (id) {
  return await db("financial_inputs").where("id", +id).del();
};
