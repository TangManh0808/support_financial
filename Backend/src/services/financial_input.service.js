const db = require("../config/knex");
module.exports.getAll = async function () {
  return await db("financial_inputs").select("*");
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
  let result = await db("financial_inputs").insert([
    {
      company_id: company_id,
      user_id: user_id,
      month: month,
      year: year,
      field: field,
      value: value,
      note: note,
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
    company_id: company_id,
    user_id: user_id,
    month: month,
    year: year,
    field: field,
    value: value,
    note: note,
  });
};
module.exports.deleteOne = async function (id) {
  return await db("financial_inputs").where("id", +id).del();
};
