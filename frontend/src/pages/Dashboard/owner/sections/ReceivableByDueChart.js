// src/pages/dashboard/Owner/ReceivableByDueChart.jsx
import { Card, CardContent } from "~/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Trong hạn", value: 320000000 },
  { name: "Quá hạn", value: 180000000 },
];

const COLORS = ["#10b981", "#ef4444"]; // Xanh lá - Đỏ

const ReceivableByDueChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="col-span-1 bg-white shadow-sm p-4">
      <div className="text-left mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Nợ phải thu theo hạn nợ</h2>
        <p className="text-sm text-gray-500">Tổng: {total.toLocaleString("vi-VN")} VND</p>
      </div>
      <CardContent className="flex justify-center">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toLocaleString("vi-VN")} VND`} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ReceivableByDueChart;
