const db = require("../config/knex");
module.exports.getAll = async function () {
  return await db("transaction_categories").select("*");
};
module.exports.getOne = async function (id) {
  return await db("transaction_categories").where("id", +id);
};

module.exports.createOne = async function (company_id, name, type) {
  let result = await db("transaction_categories").insert([
    {
      company_id: company_id,
      name: name,
      type: type,
    },
  ]);
};
module.exports.updateOne = async function (id, company_id, name, type) {
  return await db("transaction_categories").where("id", +id).update({
    company_id: company_id,
    name: name,
    type: type,
  });
};
module.exports.deleteOne = async function (id) {
  return await db("transaction_categories").where("id", +id).del();
};
