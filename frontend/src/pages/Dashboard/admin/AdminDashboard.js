// src/pages/dashboard/admin/AdminDashboard.jsx
import { useState } from "react";
import { useAdminOverview } from "~/hooks/dashboard/admin/useAdminOverview";
import { Card, CardContent } from "~/components/ui/card";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CardBox = ({ title, value }) => (
  <Card className="w-full shadow-lg rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition duration-300">
    <CardContent className="p-5">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-purple-700 mt-2">{value}</p>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { overview, loading } = useAdminOverview(year);

  const months = [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12",
  ];
  const chartData =
    overview?.companiesByMonth?.map((item, idx) => ({
      month: months[idx],
      count: item.count,
    })) || [];

  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Tổng quan hệ thống
        </h1>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-md px-3 py-2 shadow text-gray-700"
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              Năm {y}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <CardBox title="Tổng số người dùng" value={overview.totalUsers} />
            <CardBox title="Tổng số công ty" value={overview.totalCompanies} />
            <CardBox
              title="Tổng số danh mục"
              value={overview.totalCategories}
            />
            <CardBox
              title="Tổng số giao dịch"
              value={overview.totalTransactions}
            />
          </div>

          {/* Biểu đồ Line + Grid */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Số công ty đăng ký mới trong {year}
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="colorCompany" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#e5e7eb" strokeDasharray="0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorCompany)"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
