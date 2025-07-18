// src/pages/Dashboard/admin/AdminCategoriesPage.jsx
import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { useAdminCategories } from "~/hooks/dashboard/admin/useAdminCategories";
import axios from "axios";

const CategoryRow = ({ category, onDelete }) => (
  <tr className="border-b text-sm">
    <td className="p-2">{category.name}</td>
    <td className="p-2 capitalize">{category.type}</td>
    <td className="p-2">{category.company_name || "—"}</td>
    <td className="p-2 space-x-2">
      <button
        className="text-blue-600 hover:underline"
        onClick={() => alert("Chức năng sửa chưa được triển khai")}
      >
        Sửa
      </button>
      <button
        className="text-red-600 hover:underline"
        onClick={() => onDelete(category.id)}
      >
        Xóa
      </button>
    </td>
  </tr>
);

const AdminCategoriesPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { categories, pagination, loading } = useAdminCategories(search, page);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) return;

    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/admin/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Re-fetch
    window.location.reload();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Quản lý danh mục</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên danh mục hoặc công ty..."
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
                <th className="p-2">Loại</th>
                <th className="p-2">Công ty</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-6">Đang tải...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-6">Không có danh mục</td></tr>
              ) : (
                categories.map((category) => (
                  <CategoryRow key={category.id} category={category} onDelete={handleDelete} />
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* PHÂN TRANG */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          disabled={pagination.page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded text-sm disabled:opacity-50"
        >
          Trang trước
        </button>
        <button
          disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded text-sm disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
