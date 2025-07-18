const db = require("../../../config/knex");

exports.getAllCategories = async ({ page = 1, limit = 10, search = "" }) => {
  const offset = (page - 1) * limit;

  const query = db("transaction_categories as c")
    .leftJoin("companies as co", "c.company_id", "co.id")
    .modify((qb) => {
      if (search) {
        qb.where("c.name", "like", `%${search}%`).orWhere(
          "co.name",
          "like",
          `%${search}%`
        );
      }
    })
    .select(
      "c.id",
      "c.name",
      "c.type",
      "c.created_at",
      "co.name as company_name"
    )
    .limit(limit)
    .offset(offset);

  const countQuery = db("transaction_categories as c")
    .leftJoin("companies as co", "c.company_id", "co.id")
    .modify((qb) => {
      if (search) {
        qb.where("c.name", "like", `%${search}%`).orWhere(
          "co.name",
          "like",
          `%${search}%`
        );
      }
    })
    .count("* as total")
    .first();

  const [categories, countResult] = await Promise.all([query, countQuery]);

  return {
    categories,
    pagination: {
      page: +page,
      limit: +limit,
      total: countResult.total,
    },
  };
};

exports.deleteCategory = async (id) => {
  return await db("transaction_categories").where({ id }).del();
};

exports.updateCategory = async (id, { name, type }) => {
  return await db("transaction_categories")
    .where({ id })
    .update({ name, type });
};
