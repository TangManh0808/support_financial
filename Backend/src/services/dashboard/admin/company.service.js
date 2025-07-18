const db = require("../../../config/knex");

exports.getAllCompanies = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;

  const query = db("companies as c")
    .leftJoin("users as u", "c.id", "u.company_id")
    .select(
      "c.id",
      "c.name",
      "c.tax_code",
      "c.email",
      "c.phone",
      "c.created_at"
    )
    .count("u.id as user_count")
    .groupBy("c.id");

  if (search) {
    query.where(function () {
      this.where("c.name", "like", `%${search}%`)
        .orWhere("c.tax_code", "like", `%${search}%`)
        .orWhere("c.email", "like", `%${search}%`);
    });
  }

  const totalQuery = query.clone();

  const data = await query.limit(limit).offset(offset);
  const total = await totalQuery.count("* as total").first();

  return {
    companies: data,
    pagination: {
      page,
      limit,
      total: total.total || 0,
    },
  };
};
