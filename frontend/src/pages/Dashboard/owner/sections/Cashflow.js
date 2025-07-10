import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent } from "~/components/ui/card";
import useCashflow from "~/hooks/dashboard/owner/useCashflow";

const CashFlowChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, loading, error } = useCashflow(year);

  const chartData = data.map((item) => ({
    month: `T${parseInt(item.label.split("-")[1])}`,
    revenue: parseFloat(item.totalRevenue),
    expense: parseFloat(item.totalExpense),
    cashflow: parseFloat(item.netCashflow),
  }));

  const yearOptions = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <Card className="col-span-2 bg-white shadow-sm p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="text-left">
          <h2 className="text-lg font-semibold text-gray-900">Dòng tiền</h2>
          <p className="text-sm text-gray-500">Đvt: VNĐ</p>
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
          <p>Đang tải...</p>
        ) : error ? (
          <p className="text-red-500">Lỗi khi tải dữ liệu</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `${Math.round(value / 1_000_000)}M`}
              />
              <Tooltip
                formatter={(value) =>
                  `${new Intl.NumberFormat("vi-VN").format(value)} VNĐ`
                }
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Tổng thu"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorExpense)"
                name="Tổng chi"
              />
              <Area
                type="monotone"
                dataKey="cashflow"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorCashflow)"
                name="Dòng tiền ròng"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CashFlowChart;
