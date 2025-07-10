import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import useRevenueTimeline from "~/hooks/dashboard/owner/useRevenueTimeline";

const RevenueTimeline = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, loading, error } = useRevenueTimeline(year);

  const yearOptions = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <Card className="col-span-2 bg-white shadow-sm p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="text-left">
          <h2 className="text-lg font-semibold text-gray-900">Doanh thu</h2>
          <p className="text-sm text-gray-500">Đvt: Triệu đồng</p>
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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#111", fontWeight: "bold", fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `${Math.round(value / 1_000_000)}M`}
                tick={{ fill: "#111", fontWeight: "bold", fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) =>
                  `${new Intl.NumberFormat("vi-VN").format(value)}`
                }
              />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#10b981" // Xanh ngọc
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                name="Doanh thu"
                isAnimationActive={true}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueTimeline;
