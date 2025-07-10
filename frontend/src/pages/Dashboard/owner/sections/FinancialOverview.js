import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useState, useEffect } from "react";
import api from "~/lib/axios";
import { ReloadIcon } from "@radix-ui/react-icons";

const FinancialOverview = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dashboard/owner/financial", {
        params: { month, year },
      });
      // console.log(res.data.data);
      setData(res.data.data);
      setError(false);
      const now = new Date();
      setLastUpdated(
        `${now.getHours()}h${now.getMinutes().toString().padStart(2, "0")}`
      );
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, year]);

  const formatNumber = (value) =>
    typeof value === "number"
      ? `${(value / 1_000).toLocaleString("vi-VN")} `
      : "0";

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearOptions = [2023, 2024, 2025];

  return (
    <Card className="col-span-4 bg-orange-600 text-black p-6">
      <div className="flex justify-between items-start w-full">
        {/* ✅ Tiêu đề + icon */}
        <div className="text-lg text-white font-bold flex items-center gap-2">
          <span>📊</span>
          <span className="text-xl font-extrabold">Tình hình tài chính</span>
        </div>

        {/* Select tháng/năm + nút reload */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="text-sm border px-2 py-1 rounded"
            >
              {monthOptions.map((m) => (
                <option key={m} value={m}>
                  Tháng {m}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="text-sm border px-2 py-1 rounded"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  Năm {y}
                </option>
              ))}
            </select>

            <button onClick={fetchData} title="Tải lại">
              <ReloadIcon
                className={`h-5 w-5 ${loading ? "animate-spin" : ""} `}
              />
            </button>
          </div>
          <p className="text-xs text-white mt-1">Đvt: Triệu đồng</p>
        </div>
      </div>

      <CardContent>
        {error ? (
          <div className="text-red-500">Lỗi khi lấy dữ liệu</div>
        ) : !data ? (
          <div>Đang tải dữ liệu...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-white">
              {/* Cột trái */}
              <div>
                <div className="flex justify-between font-bold text-base border-b pb-1">
                  <span className="flex items-center gap-1 text-white">
                    💰 TỔNG TIỀN
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatNumber(data.total)}
                  </span>
                </div>
                <div className="flex justify-between mt-3 border-b pb-1">
                  <span className="flex items-center gap-1 font-semibold text-base">
                    💵 Tiền mặt
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatNumber(data.cash)}
                  </span>
                </div>
                <div className="flex justify-between mt-3 border-b pb-1">
                  <span className="flex items-center gap-1 font-semibold text-base">
                    🏦 Tiền gửi
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatNumber(data.bank)}
                  </span>
                </div>
                <div className="flex justify-between mt-3 border-b pb-1">
                  <span className="flex items-center gap-1 font-semibold text-base">
                    📥 Phải thu
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatNumber(data.receivable)}
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="flex items-center gap-1 font-semibold text-base">
                    📤 Phải trả
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatNumber(data.payable)}
                  </span>
                </div>
              </div>

              {/* Cột phải */}
              <div>
                <div className="flex justify-between mt-3 border-b pb-1">
                  <span className="flex items-center gap-1 font-semibold text-base">
                    📈 Doanh thu
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatNumber(data.revenue)}
                  </span>
                </div>
                <div className="flex justify-between mt-3 border-b pb-1">
                  <span className="flex items-center gap-1 font-semibold text-base">
                    💸 Chi phí
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatNumber(data.expense)}
                  </span>
                </div>
                <div className="flex justify-between mt-3 border-b pb-1">
                  <span className="flex items-center gap-1 font-semibold text-base">
                    🧮 Lợi nhuận
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatNumber(data.profit)}
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="flex items-center gap-1 font-semibold text-base">
                    📦 Hàng tồn kho
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatNumber(data.inventory)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-white mt-4">
              Số liệu tính đến: {lastUpdated}
              <button
                onClick={fetchData}
                className="text-white hover:underline ml-2"
              >
                Tải lại
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
