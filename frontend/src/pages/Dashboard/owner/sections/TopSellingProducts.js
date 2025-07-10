import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Card } from "~/components/ui/card";

const mockDataByYear = {
  2025: [
    { name: "Xe nâng K40", quantity: 10, revenue: 120000, color: "bg-blue-500" },
    { name: "Xe cẩu mini", quantity: 8, revenue: 105000, color: "bg-purple-500" },
    { name: "Máy trộn bê tông", quantity: 6, revenue: 85000, color: "bg-cyan-500" },
    { name: "Máy ủi D85", quantity: 5, revenue: 72000, color: "bg-emerald-500" },
    { name: "Xe tải Hino", quantity: 4, revenue: 60000, color: "bg-yellow-500" },
  ],
  2024: [
    { name: "Xe cẩu mini", quantity: 9, revenue: 110000, color: "bg-purple-500" },
    { name: "Xe tải Hino", quantity: 7, revenue: 96000, color: "bg-yellow-500" },
    { name: "Máy ủi D85", quantity: 6, revenue: 85000, color: "bg-emerald-500" },
    { name: "Máy trộn bê tông", quantity: 5, revenue: 79000, color: "bg-cyan-500" },
    { name: "Xe nâng K40", quantity: 3, revenue: 45000, color: "bg-blue-500" },
  ],
};

const TopSellingProducts = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [lastUpdated, setLastUpdated] = useState(
    `${new Date().getHours()}h${new Date().getMinutes()}`
  );
  const [data, setData] = useState(mockDataByYear[year]);

  const handleReload = () => {
    setLastUpdated(`${new Date().getHours()}h${new Date().getMinutes()}`);
    setData(mockDataByYear[year]);
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const yearOptions = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <Card className="col-span-2 bg-white text-gray-900 p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        {/* Tiêu đề và Tổng doanh thu */}
        <div>
          <h2 className="text-xl font-bold">Mặt hàng bán chạy</h2>
          <div className="text-3xl font-extrabold mt-1">
            {totalRevenue.toLocaleString("vi-VN")}
            <span className="text-base font-medium ml-1">Triệu đồng</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">TỔNG DOANH THU</p>
        </div>

        {/* Bộ lọc năm & nút reload */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <select
              value={year}
              onChange={(e) => {
                setYear(Number(e.target.value));
                setData(mockDataByYear[e.target.value]);
              }}
              className="text-sm border border-gray-300 px-2 py-1 rounded"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  Năm {y}
                </option>
              ))}
            </select>
            <button onClick={handleReload}>
              <ReloadIcon className="h-4 w-4 hover:animate-spin" />
            </button>
          </div>
          <p className="text-xs text-gray-500">Đvt: Triệu đồng</p>
        </div>
      </div>

      {/* Header bảng */}
      <div className="text-xs font-semibold border-b pb-2 mb-2 flex justify-between px-1">
        <span className="w-1/3">Tên</span>
        <span className="w-1/3 text-center">Số lượng</span>
        <span className="w-1/3 text-right">Doanh thu</span>
      </div>

      {/* Dữ liệu bảng */}
      <div className="space-y-2 text-sm font-semibold">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 w-1/3">
              <span className={`w-2 h-2 rounded-full ${item.color}`} />
              {item.name}
            </div>
            <div className="text-center w-1/3">{item.quantity}</div>
            <div className="text-right w-1/3">
              {item.revenue.toLocaleString("vi-VN")}
            </div>
          </div>
        ))}
      </div>

      {/* Thời gian cập nhật */}
      <div className="text-xs text-gray-500 mt-4">
        Số liệu tính đến: {lastUpdated}{" "}
        <button
          onClick={handleReload}
          className="text-blue-600 hover:underline ml-2"
        >
          Tải lại
        </button>
      </div>
    </Card>
  );
};

export default TopSellingProducts;
