// src/pages/dashboard/Owner/RevenueExpenseChart.jsx
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import {
  Bar,
  BarChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useRevenueExpense from "~/hooks/dashboard/owner/useRevenueExpense";
import { useState } from "react";

const RevenueExpenseChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, error } = useRevenueExpense(year);

  const yearOptions = [2023, 2024, 2025];

  return (
    <Card className="col-span-2 bg-white shadow-sm p-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">Doanh thu & Chi phí</h2>
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
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              barGap={0}
              barCategoryGap="10%"
            >
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
                stroke="#000"
                tick={{ fill: "#000", fontSize: 12, fontWeight: "bold" }}
              />

              <YAxis
                stroke="#000"
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
                tick={{ fill: "#000", fontSize: 12, fontWeight: "bold" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderColor: "#000",
                  color: "#000",
                }}
                formatter={(value) =>
                  `${(value / 1_000_000).toLocaleString()} triệu`
                }
                labelStyle={{ color: "#000", fontWeight: "bold" }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ color: "#000" }}
              />

              {/* ✅ CỘT DOANH THU - xanh lá tươi đậm */}
              <Bar
                dataKey="revenue"
                fill="#2e7d32"
                name="Doanh thu"
                radius={[4, 4, 0, 0]}
              />

              {/* ✅ CỘT CHI PHÍ - đỏ tươi */}
              <Bar
                dataKey="expense"
                fill="#ff0000"
                name="Chi phí"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueExpenseChart;
