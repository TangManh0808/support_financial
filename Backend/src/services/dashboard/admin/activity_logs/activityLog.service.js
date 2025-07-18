const db = require("../../../../config/knex");

exports.getLogs = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;

  const baseQuery = db("activity_logs")
    .leftJoin("users", "activity_logs.user_id", "users.id")
    .leftJoin("companies", "users.company_id", "companies.id")
    .modify((queryBuilder) => {
      if (search) {
        queryBuilder.where((qb) => {
          qb.where("users.name", "like", `%${search}%`)
            .orWhere("users.email", "like", `%${search}%`)
            .orWhere("companies.name", "like", `%${search}%`)
            .orWhere("activity_logs.action", "like", `%${search}%`);
        });
      }
    });

  const totalQuery = baseQuery.clone().count("* as count").first();
  const resultQuery = baseQuery
    .clone()
    .select(
      "activity_logs.id",
      "activity_logs.action",
      "activity_logs.created_at",
      "users.name as user_name",
      "users.role as user_role",
      "companies.name as company_name"
    )
    .orderBy("activity_logs.created_at", "desc")
    .limit(limit)
    .offset(offset);

  const [totalResult, logs] = await Promise.all([totalQuery, resultQuery]);

  return {
    logs,
    pagination: {
      page,
      limit,
      total: totalResult.count,
    },
  };
};
