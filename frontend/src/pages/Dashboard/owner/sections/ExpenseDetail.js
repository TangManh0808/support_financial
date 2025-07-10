import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "~/components/ui/card";
import useExpenseDetail from "~/hooks/dashboard/owner/useExpenseDetail";

const COLORS = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#6b7280"];

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN").format(Math.round(value));

const ExpenseChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, loading, error } = useExpenseDetail(year);

  // Lọc top 5, còn lại gộp thành 'Chi phí khác'
  const sorted = [...data].sort((a, b) => b.total - a.total);
  const top5 = sorted.slice(0, 5);
  const othersTotal = sorted.slice(5).reduce((sum, item) => sum + Number(item.total), 0);

  const processedData = [
    ...top5.map((item) => ({ category: item.category, total: Number(item.total) })),
    ...(othersTotal > 0 ? [{ category: "Chi phí khác", total: othersTotal }] : []),
  ];

  const yearOptions = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <Card className="col-span-2 bg-white shadow-sm p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="text-left">
          <h2 className="text-lg font-semibold text-gray-900">Chi phí theo loại</h2>
          <p className="text-sm text-gray-500">Đvt: VND</p>
        </div>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              Năm {y}
            </option>
          ))}
        </select>
      </div>

      <CardContent>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-red-500">Lỗi khi tải dữ liệu</p>
        ) : (
          <div className="flex flex-row gap-8 items-start">
            {/* Biểu đồ bên trái */}
            <div className="w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processedData}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
                  >
                    {processedData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      `${formatCurrency(value)} VND`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Danh sách bên phải */}
            <div className="w-1/2 space-y-2">
              {processedData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    ></span>
                    <span
                      className="font-medium text-base"
                      style={{ color: COLORS[idx % COLORS.length] }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <span
                    className="font-semibold text-base"
                    style={{ color: COLORS[idx % COLORS.length] }}
                  >
                    {formatCurrency(item.total)} đ
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
