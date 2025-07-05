const db = require("../config/knex");
module.exports.getAll = async function () {
  return await db("companies").select("*");
};
module.exports.getOne = async function (id) {
  return await db("companies").where("id", +id).first();
};

module.exports.createOne = async function (
  name,
  tax_code,
  address,
  email,
  phone
) {
  let result = await db("companies").insert([
    {
      name: name,
      tax_code: tax_code,
      address: address,
      email: email,
      phone: phone,
    },
  ]);
};
module.exports.updateOne = async function (
  id,
  name,
  tax_code,
  address,
  email,
  phone
) {
  return await db("companies").where("id", +id).update({
    name: name,
    tax_code: tax_code,
    address: address,
    email: email,
    phone: phone,
  });
};
module.exports.deleteOne = async function (id) {
  return await db("companies").where("id", +id).del();
};
