const db = require("../config/knex");
module.exports.getAll = async function () {
  return await db("users").select("*");
};
module.exports.getOne = async function (id) {
  return await db("users").where("id", +id).first();
};

module.exports.createOne = async function (
  company_id,
  name,
  email,
  password,
  role
) {
  let result = await db("users").insert([
    {
      company_id: company_id,
      name: name,
      email: email,
      password: password,
      role: role,
    },
  ]);
};
module.exports.updateOne = async function (
  id,
  company_id,
  name,
  email,
  password,
  role
) {
  return await db("users").where("id", +id).update({
    company_id: company_id,
    name: name,
    email: email,
    password: password,
    role: role,
  });
};
module.exports.deleteOne = async function (id) {
  return await db("users").where("id", +id).del();
};
