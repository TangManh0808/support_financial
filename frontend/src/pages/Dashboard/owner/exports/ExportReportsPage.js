import { useState } from "react";
import useExportFinancialAnalyses from "~/hooks/dashboard/exports/useExportFinancialAnalyses";
import BalanceSheet from "~/pages/Dashboard/owner/reports/BalanceSheet";
import IncomeStatement from "~/pages/Dashboard/owner/reports/IncomeStatement";
import FinancialAnalysis from "./ExportFinancialAnalysis";

const ExportPage = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const { balanceSheet, incomeStatement, financialAnalysis, loading, error } =
    useExportFinancialAnalyses({ month, year });

  const handleExport = () => {
    // ❗ Bạn có thể tích hợp logic export tại đây (PDF, Excel, v.v.)
    alert("Đang phát triển chức năng xuất file!");
  };

  return (
    <div className="px-6 pt-6 space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">
        📁 Xuất Báo Cáo Tài Chính
      </h1>

      {/* Bộ lọc tháng năm */}
      <div className="flex gap-4">
        <select
          className="border rounded px-3 py-2 text-base"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2 text-base"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              Năm {y}
            </option>
          ))}
        </select>

        <button
          onClick={handleExport}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          📤 Xuất file
        </button>
      </div>

      {/* Hiển thị báo cáo */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-10">
          <BalanceSheet data={balanceSheet} />
          <IncomeStatement data={incomeStatement} />
          <FinancialAnalysis data={financialAnalysis} />
        </div>
      )}
    </div>
  );
};

export default ExportPage;
