const db = require("../../../config/knex");
const bcrypt = require("bcrypt");

const DEFAULT_PASSWORD = "123456";

exports.getByCompany = async (company_id) => {
  return await db("users")
    .select("id", "name", "email", "role", "created_at")
    .where({ company_id });
};

exports.getById = async (id) => {
  return await db("users").where({ id }).first();
};

exports.findByEmail = async (email) => {
  return await db("users").where({ email }).first();
};
exports.create = async ({ name, email, role, company_id }) => {
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  const [id] = await db("users").insert({
    name,
    email,
    role,
    password: hashedPassword,
    company_id,
  });

  return await db("users").where({ id }).first();
};

exports.update = async (id, data) => {
  return await db("users").where({ id }).update(data);
};

exports.delete = async (id) => {
  return await db("users").where({ id }).del();
};
