const db = require("../config/knex");
module.exports.getAll = async function () {
  return await db("reports").select("*");
};
module.exports.getOne = async function (id) {
  return await db("reports").where("id", +id);
};

module.exports.createOne = async function (
  company_id,
  user_id,
  month,
  year,
  type,
  data_json
) {
  let result = await db("reports").insert([
    {
      company_id: company_id,
      user_id: user_id,
      month: month,
      year: year,
      type: type,
      data_json:
        typeof data_json === "string" ? data_json : JSON.stringify(data_json),
    },
  ]);
};
module.exports.updateOne = async function (
  id,
  company_id,
  user_id,
  month,
  year,
  type,
  data_json
) {
  return await db("reports")
    .where("id", +id)
    .update({
      company_id: company_id,
      user_id: user_id,
      month: month,
      year: year,
      type: type,
      data_json:
        typeof data_json === "string" ? data_json : JSON.stringify(data_json),
    });
};
module.exports.deleteOne = async function (id) {
  return await db("reports").where("id", +id).del();
};
