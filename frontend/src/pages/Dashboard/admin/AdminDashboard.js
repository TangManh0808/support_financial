// src/pages/dashboard/admin/AdminDashboard.jsx
import { useAdminOverview } from "~/hooks/dashboard/admin/useAdminOverview";
import { Card, CardContent } from "~/components/ui/card";

const CardBox = ({ title, value }) => (
  <Card className="w-full shadow-lg rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition duration-300">
    <CardContent className="p-5">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-purple-700 mt-2">{value}</p>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { overview, loading } = useAdminOverview();

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tổng quan hệ thống</h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <CardBox title="Tổng số người dùng" value={overview.totalUsers} />
          <CardBox title="Tổng số công ty" value={overview.totalCompanies} />
          <CardBox title="Tổng số danh mục" value={overview.totalCategories} />
          <CardBox title="Tổng số giao dịch" value={overview.totalTransactions} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
