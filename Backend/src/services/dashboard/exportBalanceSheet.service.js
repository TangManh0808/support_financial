// services/dashboard/export.service.js
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const { getBalanceSheet } = require("./balanceSheet.service");

const exportService = async ({ company_id, month, year }) => {
  const data = await getBalanceSheet({
    company_id,
    month: Number(month),
    year: Number(year),
  });
  console.log(data);
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Báo cáo CĐKT");

  // Tiêu đề
  sheet.mergeCells("A1:D1");
  sheet.getCell(
    "A1"
  ).value = `BÁO CÁO CÂN ĐỐI KẾ TOÁN - Tháng ${month}/${year}`;
  sheet.getCell("A1").font = { bold: true, size: 14 };
  sheet.getCell("A1").alignment = { horizontal: "center" };

  let rowIndex = 3;

  const addSection = (title, rows) => {
    sheet.getCell(`A${rowIndex}`).value = title;
    sheet.getCell(`A${rowIndex}`).font = { bold: true };
    rowIndex++;

    rows.forEach(([label, value]) => {
      sheet.getCell(`A${rowIndex}`).value = label;
      sheet.getCell(`C${rowIndex}`).value = value;
      rowIndex++;
    });

    rowIndex++;
  };

  addSection("A- Tài sản ngắn hạn", [
    ["1. Tiền mặt:", data.assets.shortTerm.cash],
    ["2. Số dư ngân hàng:", data.assets.shortTerm.bank],
    ["3. Các khoản phải thu ngắn hạn:", data.assets.shortTerm.receivables],
    ["4. Hàng tồn kho:", data.assets.shortTerm.inventory],
  ]);

  addSection("B- Tài sản dài hạn", [
    ["1. Tài sản cố định:", data.assets.longTerm.fixedAssets],
    ["2. Đầu tư tài chính dài hạn:", data.assets.longTerm.longTermInvestments],
  ]);

  addSection("C- Nợ phải trả", [
    ["1. Nợ ngắn hạn:", data.liabilities.shortTermDebt],
    ["2. Nợ dài hạn:", data.liabilities.longTermDebt],
  ]);

  addSection("D- Vốn Chủ Sở Hữu", [
    ["1. Vốn góp:", data.equity.capital],
    ["2. Lợi nhuận chưa phân phối:", data.equity.retainedEarnings],
    ["3. Quỹ đầu tư và phát triển:", data.equity.developmentFunds],
  ]);

  // Căn lề và định dạng
  sheet.columns = [
    { key: "label", width: 40 },
    { key: "sep", width: 5 },
    { key: "value", width: 20 },
  ];

  const exportDir = path.join(__dirname, "../../../exports");
  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

  const filePath = path.join(
    exportDir,
    `balance_sheet_${company_id}_${month}_${year}.xlsx`
  );
  await workbook.xlsx.writeFile(filePath);

  return { filePath };
};

module.exports = { exportService };
