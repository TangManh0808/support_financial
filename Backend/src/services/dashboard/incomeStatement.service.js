const db = require("../../config/knex");

async function incomeStatementService({ company_id, month, year }) {
  if (!company_id || !month || !year) {
    throw new Error("Thiếu tham số companyId, month hoặc year");
  }

  const companyId = company_id;
  // 1. Doanh thu
  const revenueResult = await db("transactions")
    .where({ company_id: companyId, type: "revenue", status: "paid" })
    .whereRaw("MONTH(date) = ? AND YEAR(date) = ?", [month, year])
    .sum({ revenue: "amount" })
    .first();

  const revenue = parseFloat(revenueResult.revenue || 0);

  // 2. Giá vốn hàng bán (transaction_categories.name LIKE '%giá vốn%')
  const cogsResult = await db("transactions as t")
    .leftJoin("transaction_categories as c", "t.category_id", "c.id")
    .where("t.company_id", companyId)
    .andWhere("t.type", "expense")
    .andWhere("t.status", "paid")
    .andWhereRaw("MONTH(t.date) = ? AND YEAR(t.date) = ?", [month, year])
    .andWhere("c.name", "like", "%Giá vốn%")
    .sum({ cogs: "t.amount" })
    .first();

  const costOfGoodsSold = parseFloat(cogsResult.cogs || 0);

  // 3. Các giá trị từ bảng financial_inputs
  const inputs = await db("financial_inputs")
    .select("field", "value")
    .where("company_id", companyId)
    .andWhere("month", month)
    .andWhere("year", year);

  // Đưa về map
  const inputMap = {};
  for (const { field, value } of inputs) {
    inputMap[field] = parseFloat(value || 0);
  }

  const sellingExpenses = inputMap["selling_expenses"] || 0;
  const adminExpenses = inputMap["admin_expenses"] || 0;
  const depreciation = inputMap["depreciation"] || 0;
  const leasingCosts = inputMap["leasing_costs"] || 0;
  const taxOther = inputMap["tax_other"] || 0;
  const corporateTax = inputMap["corporate_tax"] || 0;

  // 4. Tính toán
  const grossProfit = revenue - costOfGoodsSold;
  const operatingProfit =
    grossProfit -
    sellingExpenses -
    adminExpenses -
    depreciation -
    leasingCosts -
    taxOther;
  const netProfit = operatingProfit - corporateTax;

  return {
    data: {
      revenue,
      costOfGoodsSold,
      grossProfit,
      sellingExpenses,
      adminExpenses,
      depreciation,
      leasingCosts,
      operatingProfit,
      corporateTax,
      netProfit,
      taxOther,
    },
    message: "Lấy báo cáo kết quả kinh doanh thành công",
  };
}

module.exports = {
  incomeStatementService,
};
