const db = require("../config/knex");

module.exports.getAll = async function ({ page = 1, limit = 10, search = "", type = "", company_id = null }) {
  const query = db("transaction_categories");

  if (company_id) {
    query.where("company_id", company_id);
  }

  if (search) {
    query.andWhere("name", "like", `%${search}%`);
  }

  if (type && ["revenue", "expense"].includes(type)) {
    query.andWhere("type", type);
  }

  const total = await query.clone().count("id as count").first();
  const result = await query
    .select("*")
    .orderBy("created_at", "desc")
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    data: result,
    total: +total.count,
    page: +page,
    limit: +limit,
  };
};

module.exports.getOne = async function (id) {
  return await db("transaction_categories").where("id", +id).first();
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
