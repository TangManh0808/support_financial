import { useState } from "react";
import useFinancialAnalyses from "~/hooks/dashboard/owner/analyses/useFinancialAnalyses";

const AnalysesPage = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const data = useFinancialAnalyses({ month, year });

  const format = (n) => (n ? (n * 100).toFixed(2) + "%" : "0%");

  const metrics = [
    { label: "ROA", value: format(data.ROA), color: "text-blue-600" },
    { label: "ROE", value: format(data.ROE), color: "text-green-600" },
    { label: "Tỷ lệ Nợ", value: format(data.TyLeNo), color: "text-red-500" },
    {
      label: "Khả năng thanh toán hiện hành",
      value: data.TyLeThanhToanHienHanh?.toFixed(2),
      color: "text-yellow-600",
    },
    {
      label: "Vòng quay hàng tồn kho",
      value: data.VongQuayHangTonKho?.toFixed(2),
      color: "text-indigo-600",
    },
    {
      label: "Vòng quay tài sản",
      value: data.VongQuayTaiSan?.toFixed(2),
      color: "text-pink-600",
    },
    {
      label: "Biên lợi nhuận ròng",
      value: format(data.BienLoiNhuanRong),
      color: "text-emerald-600",
    },
    {
      label: "Biên lợi nhuận gộp",
      value: format(data.BienLoiNhuanGop),
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="pt-10 text-3xl font-semibold text-gray-900 ">
        📊 Phân tích tài chính
      </h2>
      <div className="flex gap-4">
        <select
          className="border text-xl p-2 rounded-md"
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
          className="border text-xl p-2 rounded-md"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>
              Năm {y}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl shadow-md p-5 border bg-white ${item.color}`}
          >
            <h4 className="text-lg font-semibold">{item.label}</h4>
            <p className="text-2xl mt-2 font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysesPage;
