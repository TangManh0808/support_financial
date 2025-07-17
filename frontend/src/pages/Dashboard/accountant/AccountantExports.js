import { useState } from "react";
import { useExportReport } from "~/hooks/dashboard/owner/exports/useExportReport";
import { Loader2, FileDown } from "lucide-react";

export default function ExportsPage() {
  const [reportType, setReportType] = useState("balanceSheet");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const { exportReport, loading } = useExportReport();

  const handleExport = () => {
    exportReport({ reportType, month, year });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 transition hover:shadow-xl space-y-6">
        <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
          <FileDown className="w-6 h-6" />
          <span>Xuất báo cáo tài chính</span>
        </h1>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            🗂 Loại báo cáo
          </label>
          <select
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="balanceSheet">📊 Bảng cân đối kế toán</option>
            <option value="incomeStatement">📈 Kết quả kinh doanh</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">
              📅 Tháng
            </label>
            <input
              type="number"
              min={1}
              max={12}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">
              📅 Năm
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </div>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2 hover:bg-blue-700 transition disabled:opacity-60"
          onClick={handleExport}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Đang xuất...
            </>
          ) : (
            <>
              <FileDown className="w-5 h-5" />
              Xuất báo cáo
            </>
          )}
        </button>
      </div>
    </div>
  );
}
