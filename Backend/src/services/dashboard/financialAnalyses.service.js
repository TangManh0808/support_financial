const db = require("../../config/knex");

module.exports = async ({ month, year, company_id }) => {
  const rows = await db("financial_inputs")
    .select("field", db.raw("SUM(value) as total"))
    .where({ company_id })
    .andWhereRaw("MONTH(created_at) = ?", [month])
    .andWhereRaw("YEAR(created_at) = ?", [year])
    .groupBy("field");

  const map = Object.fromEntries(rows.map((r) => [r.field, Number(r.total)]));

  const doanhThu = map.revenue || 0;
  const loiNhuanSauThue = map.net_profit || 0;
  const tongTaiSan =
    (map.cash_on_hand || 0) +
    (map.bank_balance || 0) +
    (map.inventory || 0) +
    (map.receivables || 0) +
    (map.fixed_assets || 0) +
    (map.long_term_investments || 0);
  const vonChuSoHuu =
    (map.owner_capital || 0) +
    (map.retained_earnings || 0) +
    (map.reserve_fund || 0);
  const noPhaiTra = (map.short_term_debt || 0) + (map.long_term_debt || 0);
  const chiPhi =
    (map.selling_expenses || 0) +
    (map.admin_expenses || 0) +
    (map.depreciation || 0) +
    (map.corporate_tax || 0);

  return {
    ROA: tongTaiSan !== 0 ? loiNhuanSauThue / tongTaiSan : 0,
    ROE: vonChuSoHuu !== 0 ? loiNhuanSauThue / vonChuSoHuu : 0,
    TyLeNo: tongTaiSan !== 0 ? noPhaiTra / tongTaiSan : 0,
    TyLeThanhToanHienHanh:
      map.short_term_debt !== 0
        ? (map.cash_on_hand + map.bank_balance + map.receivables) /
          map.short_term_debt
        : 0,
    VongQuayHangTonKho: map.inventory !== 0 ? doanhThu / map.inventory : 0,
    VongQuayTaiSan: tongTaiSan !== 0 ? doanhThu / tongTaiSan : 0,
    BienLoiNhuanRong: doanhThu !== 0 ? loiNhuanSauThue / doanhThu : 0,
    BienLoiNhuanGop:
      doanhThu !== 0 && map.cost_of_goods_sold !== undefined
        ? (doanhThu - map.cost_of_goods_sold) / doanhThu
        : 0,
  };
};
