const db = require("../../../config/knex");

exports.getByCompany = async (company_id) => {
  return await db("users")
    .select("id", "name", "email", "role", "created_at")
    .where({ company_id });
};

exports.getById = async (id) => {
  return await db("users").where({ id }).first();
};

exports.create = async (data) => {
  return await db("users").insert(data);
};

exports.update = async (id, data) => {
  return await db("users").where({ id }).update(data);
};

exports.delete = async (id) => {
  return await db("users").where({ id }).del();
};
