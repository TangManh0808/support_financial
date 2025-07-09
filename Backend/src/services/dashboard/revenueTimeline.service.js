// services/revenueTimeline.service.js
const knex = require("../../config/knex");

exports.getTimelineData = async ({
  type = "daily",
  year,
  from,
  to,
  company_id,
}) => {
  let dateSelect = "";
  let groupBy = "";

  switch (type) {
    case "yearly":
      dateSelect = knex.raw("YEAR(date) AS label");
      groupBy = knex.raw("YEAR(date)");
      break;
    case "monthly":
      dateSelect = knex.raw("DATE_FORMAT(date, '%Y-%m') AS label");
      groupBy = knex.raw("DATE_FORMAT(date, '%Y-%m')");
      break;
    case "daily":
    default:
      dateSelect = knex.raw("DATE(date) AS label");
      groupBy = knex.raw("DATE(date)");
      break;
  }

  const query = knex("transactions")
    .select(dateSelect)
    .sum({ totalRevenue: "amount" })
    .where("type", "revenue")
    .andWhere("company_id", company_id) // ✅ Phân quyền theo công ty
    .groupBy(groupBy)
    .orderBy(groupBy);

  if (year) {
    query.andWhereRaw("YEAR(date) = ?", [year]);
  }

  if (from && to) {
    query.andWhereBetween("date", [from, to]);
  }

  return await query;
};
