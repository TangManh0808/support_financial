const db = require("../../../config/knex");

module.exports.getAllLogs = async ({ page, limit, filters }) => {
  const offset = (page - 1) * limit;

  let query = db("activity_logs as log")
    .leftJoin("users as u", "log.user_id", "u.id")
    .leftJoin("companies as c", "log.company_id", "c.id")
    .select(
      "log.id",
      "log.action",
      "log.target_table",
      "log.target_id",
      "log.message",
      "log.created_at",
      "u.email as user_email",
      "c.name as company_name"
    )
    .orderBy("log.created_at", "desc")
    .limit(limit)
    .offset(offset);

  // Áp dụng bộ lọc
  if (filters.company_id) {
    query = query.where("log.company_id", filters.company_id);
  }
  if (filters.action) {
    query = query.where("log.action", "like", `%${filters.action}%`);
  }
  if (filters.target_table) {
    query = query.where("log.target_table", filters.target_table);
  }

  // Đếm tổng
  const countQuery = db("activity_logs");
  if (filters.company_id) countQuery.where("company_id", filters.company_id);
  if (filters.action) countQuery.where("action", "like", `%${filters.action}%`);
  if (filters.target_table)
    countQuery.where("target_table", filters.target_table);

  const total = await countQuery.count("id as total").first();

  return {
    total: total.total,
    page,
    limit,
    logs: await query,
  };
};
