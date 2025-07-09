import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useState, useEffect } from "react";
import api from "~/lib/axios";
import { ReloadIcon } from "@radix-ui/react-icons";

const FinancialOverview = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());
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
      setData(res.data.data);
      setError(false);
      const now = new Date();
      setLastUpdated(`${now.getHours()}h${now.getMinutes().toString().padStart(2, "0")}`);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month]);

  const handleMonthChange = (e) => setMonth(Number(e.target.value));

  const formatNumber = (value) =>
    typeof value === "number" ? value.toLocaleString("vi-VN") : "0";

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Card className="col-span-4 bg-blue-100 text-black">
      <CardHeader className="flex justify-between items-center">
        {/* Bên trái: Tiêu đề */}
        <h2 className="text-lg font-semibold">Tình hình tài chính</h2>

        {/* Bên phải: Chọn tháng + reload + đơn vị */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <select
              value={month}
              onChange={handleMonthChange}
              className="text-sm border px-2 py-1 rounded"
            >
              {monthOptions.map((m) => (
                <option key={m} value={m}>
                  Tháng {m}
                </option>
              ))}
            </select>
            <button onClick={fetchData} title="Tải lại">
              <ReloadIcon className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-1">Đvt: Triệu đồng</p>
        </div>
      </CardHeader>

      <CardContent>
        {error ? (
          <div className="text-red-500">Lỗi khi lấy dữ liệu</div>
        ) : !data ? (
          <div>Đang tải dữ liệu...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
              {/* Cột trái */}
              <div>
                <div className="flex justify-between font-bold border-b pb-1">
                  <span>TỔNG TIỀN</span>
                  <span className="text-blue-600">{formatNumber(data.total)}</span>
                </div>
                <div className="flex justify-between mt-3 border-b">
                  <span>Tiền mặt</span>
                  <span className="text-blue-600">{formatNumber(data.cash)}</span>
                </div>
                <div className="flex justify-between mt-2 border-b">
                  <span>Tiền gửi</span>
                  <span className="text-blue-600">{formatNumber(data.bank)}</span>
                </div>
                <div className="flex justify-between mt-2 border-b">
                  <span>Phải thu</span>
                  <span className="text-blue-600">{formatNumber(data.receivable)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Phải trả</span>
                  <span className="text-blue-600">{formatNumber(data.payable)}</span>
                </div>
              </div>

              {/* Cột phải */}
              <div>
                <div className="flex justify-between mt-3 border-b">
                  <span>Doanh thu</span>
                  <span className="text-blue-600">{formatNumber(data.revenue)}</span>
                </div>
                <div className="flex justify-between mt-2 border-b">
                  <span>Chi phí</span>
                  <span className="text-blue-600">{formatNumber(data.expense)}</span>
                </div>
                <div className="flex justify-between mt-2 border-b">
                  <span>Lợi nhuận</span>
                  <span className="text-blue-600">{formatNumber(data.profit)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Hàng tồn kho</span>
                  <span className="text-blue-600">{formatNumber(data.inventory)}</span>
                </div>
              </div>
            </div>

            {/* Dòng cuối cùng */}
            <div className="text-xs text-gray-500 mt-4">
              Số liệu tính đến: {lastUpdated}{" "}
              <button onClick={fetchData} className="text-blue-600 hover:underline ml-2">
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
