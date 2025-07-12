const db = require("../../../config/knex");

exports.getById = async (company_id) => {
  const company = await db("companies").where("id", company_id).first();
  return company;
};

exports.updateById = async (company_id, data) => {
  // console.log(data);
  return await db("companies").where("id", company_id).update(data);
};
