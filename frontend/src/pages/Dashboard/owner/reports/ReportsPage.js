// src/pages/Reports/ReportsPage.jsx
import { useState } from "react";
import useReports from "~/hooks/dashboard/owner/reports/useReports";
import BalanceSheet from "./BalanceSheet";
import IncomeStatement from "./IncomeStatement";

const ReportsPage = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const { balanceSheet, incomeStatement } = useReports({ month, year });

  return (
    <div className="space-y-6 px-6 pt-10">
      {/* Tiêu đề lớn */}
      <h1 className="text-3xl font-extrabold text-slate-800">
        📊 Báo Cáo Tài Chính
      </h1>

      {/* Dropdown chọn tháng và năm */}
      <div className="flex gap-4">
        <select
          className="border px-3 py-2 rounded-md text-base font-medium"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded-md text-base font-medium"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {Array.from({ length: 3 }).map((_, i) => {
            const y = 2024 + i;
            return (
              <option key={y} value={y}>
                Năm {y}
              </option>
            );
          })}
        </select>
      </div>

      {/* Hai bảng báo cáo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceSheet data={balanceSheet} />
        <IncomeStatement data={incomeStatement} />
      </div>
    </div>
  );
};

export default ReportsPage;
