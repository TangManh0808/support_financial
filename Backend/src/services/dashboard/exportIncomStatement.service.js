const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const { incomeStatementService } = require("./incomeStatement.service");
const financialAnalysis = require("./financialAnalyses.service");

const generateIncomeStatementExcel = async ({ company_id, month, year }) => {
  const { data: incomeData } = await incomeStatementService({
    company_id,
    month,
    year,
  });
  const analysisData = await financialAnalysis({ company_id, month, year });

  const rows = [
    ["BÁO CÁO KẾT QUẢ KINH DOANH", "", "", ""],
    ["Chỉ tiêu", "Số tiền (VNĐ)", "", ""],
    ["Doanh thu thuần", incomeData.revenue],
    ["Giá vốn hàng bán", incomeData.costOfGoodsSold],
    ["Lợi nhuận gộp", incomeData.grossProfit],
    ["Chi phí bán hàng", incomeData.sellingExpenses],
    ["Chi phí quản lý doanh nghiệp", incomeData.adminExpenses],
    ["Khấu hao tài sản cố định", incomeData.depreciation],
    ["Chi phí thuê ngoài", incomeData.leasingCosts],
    ["Chi phí thuế khác", incomeData.taxOther],
    ["Lợi nhuận thuần từ hoạt động kinh doanh", incomeData.operatingProfit],
    ["Thuế TNDN", incomeData.corporateTax],
    ["Lợi nhuận sau thuế", incomeData.netProfit],
    [],
    ["🔎 PHÂN TÍCH TÀI CHÍNH", "", "", ""],
    ["ROA", analysisData.ROA],
    ["ROE", analysisData.ROE],
    ["Tỷ lệ nợ / tổng tài sản", analysisData.TyLeNo],
    ["Khả năng thanh toán hiện hành", analysisData.TyLeThanhToanHienHanh],
    ["Vòng quay hàng tồn kho", analysisData.VongQuayHangTonKho],
    ["Vòng quay tài sản", analysisData.VongQuayTaiSan],
    ["Biên lợi nhuận ròng", analysisData.BienLoiNhuanRong],
    ["Biên lợi nhuận gộp", analysisData.BienLoiNhuanGop],
  ];

  const ws = xlsx.utils.aoa_to_sheet(rows);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "KQKD");

  const exportDir = path.join(__dirname, "../../../exports");
  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

  const filePath = path.join(
    exportDir,
    `income_statement_${company_id}_${month}_${year}.xlsx`
  );
  xlsx.writeFile(wb, filePath);

  return { filePath };
};

module.exports = {
  generateIncomeStatementExcel,
};
