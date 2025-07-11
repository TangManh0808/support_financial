const db = require("../../config/knex");

const getBalanceSheet = async ({ company_id, month, year }) => {
  const rows = await db("financial_inputs")
    .select("field", db.raw("SUM(value) as total"))
    .where({ company_id })
    .andWhereRaw("MONTH(created_at) = ?", [month])
    .andWhereRaw("YEAR(created_at) = ?", [year])
    .groupBy("field");

  const result = Object.fromEntries(
    rows.map((row) => [row.field, Number(row.total)])
  );

  return {
    assets: {
      shortTerm: {
        cash: result.cash_on_hand || 0,
        bank: result.bank_balance || 0,
        inventory: result.inventory || 0,
        receivables: result.receivables || 0,
      },
      longTerm: {
        fixedAssets: result.fixed_assets || 0,
        longTermInvestments: result.long_term_investments || 0,
      },
    },
    liabilities: {
      shortTermDebt: result.short_term_debt || 0,
      longTermDebt: result.long_term_debt || 0,
    },
    equity: {
      capital: result.owner_capital || 0,
      retainedEarnings: result.retained_earnings || 0,
      developmentFunds: result.reserve_fund || 0,
    },
  };
};

module.exports = { getBalanceSheet };
