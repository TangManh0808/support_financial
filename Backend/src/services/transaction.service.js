const db = require("../config/knex");

module.exports.getAll = async function () {
  return await db("transactions").select("*");
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
