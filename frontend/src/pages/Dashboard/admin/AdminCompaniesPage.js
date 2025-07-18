import { useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { useNavigate } from "react-router-dom";
import useAdminCompanies from "~/hooks/dashboard/admin/useAdminCompanies";

const CompanyRow = ({ company, onDelete, onViewUsers, onViewDetail }) => (
  <tr className="border-b text-sm">
    <td className="p-2 font-medium">{company.name}</td>
    <td className="p-2">{company.tax_code || "—"}</td>
    <td className="p-2">{company.email}</td>
    <td className="p-2">{company.phone}</td>
    <td className="p-2">{company.total_users}</td>
    <td className="p-2 space-x-2">
      <button
        className="text-blue-600 hover:underline"
        onClick={() => onViewDetail(company.id)}
      >
        Chi tiết
      </button>
      <button
        className="text-green-600 hover:underline"
        onClick={() => onViewUsers(company.id)}
      >
        Xem user
      </button>
      <button
        className="text-red-600 hover:underline"
        onClick={() => onDelete(company.id)}
      >
        Xóa
      </button>
    </td>
  </tr>
);

const AdminCompaniesPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { companies, pagination, loading, fetchCompanies, deleteCompany } =
    useAdminCompanies();

  useEffect(() => {
    fetchCompanies(1, search);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCompanies(1, search);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa công ty này?")) {
      await deleteCompany(id);
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/admin-dashboard/companies/${id}`);
  };

  const handleViewUsers = (companyId) => {
    navigate(`/admin-dashboard/users?company_id=${companyId}`);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Quản lý công ty</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên công ty, mã số thuế..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full text-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Tìm kiếm
        </button>
      </form>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th className="p-2">Tên</th>
                <th className="p-2">Mã số thuế</th>
                <th className="p-2">Email</th>
                <th className="p-2">Điện thoại</th>
                <th className="p-2">Người dùng</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    Đang tải...
                  </td>
                </tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    Không có công ty nào
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <CompanyRow
                    key={company.id}
                    company={company}
                    onDelete={handleDelete}
                    onViewUsers={handleViewUsers}
                    onViewDetail={handleViewDetail}
                  />
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Phân trang */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          disabled={pagination.page <= 1}
          onClick={() => fetchCompanies(pagination.page - 1, search)}
          className="px-4 py-2 border rounded text-sm disabled:opacity-50"
        >
          Trang trước
        </button>
        <button
          disabled={
            pagination.page >= Math.ceil(pagination.total / pagination.limit)
          }
          onClick={() => fetchCompanies(pagination.page + 1, search)}
          className="px-4 py-2 border rounded text-sm disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default AdminCompaniesPage;
