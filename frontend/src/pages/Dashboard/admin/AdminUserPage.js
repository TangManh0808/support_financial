import useAdminUsers from "~/hooks/dashboard/admin/useAdminUsers";
import { Card, CardContent } from "~/components/ui/card";

const UserRow = ({ user, onLock, onUnlock, onDelete }) => (
  <tr className="border-b text-sm">
    <td className="p-2">{user.name}</td>
    <td className="p-2">{user.email}</td>
    <td className="p-2 capitalize">{user.role}</td>
    <td className="p-2">{user.company_name || "—"}</td>
    <td className="p-2 capitalize">
      {user.status === "locked" ? (
        <span className="text-red-500">Đã khóa</span>
      ) : (
        <span className="text-green-600">Đang hoạt động</span>
      )}
    </td>
    <td className="p-2 text-gray-500 text-xs">
      {new Date(user.created_at).toLocaleDateString("vi-VN")}
    </td>
    <td className="p-2 space-x-2 whitespace-nowrap">
      {user.status === "locked" ? (
        <button
          onClick={() => onUnlock(user.id)}
          className="border border-gray-400 px-2 py-1 rounded text-sm hover:bg-gray-100"
        >
          Mở khóa
        </button>
      ) : (
        <button
          onClick={() => onLock(user.id)}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
        >
          Khóa
        </button>
      )}
      <button
        onClick={() => onDelete(user.id)}
        className="text-gray-600 hover:text-black text-sm"
      >
        Xóa
      </button>
    </td>
  </tr>
);

const AdminUserPage = () => {
  const {
    users,
    pagination,
    loading,
    search,
    setSearch,
    handleSearch,
    handleLock,
    handleUnlock,
    handleDelete,
    fetchUsers,
  } = useAdminUsers();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Quản lý người dùng</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email, công ty..."
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
                <th className="p-2">Email</th>
                <th className="p-2">Vai trò</th>
                <th className="p-2">Công ty</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2">Ngày tạo</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    Đang tải...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    Không có người dùng
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onLock={handleLock}
                    onUnlock={handleUnlock}
                    onDelete={handleDelete}
                  />
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
          onClick={() => fetchUsers(pagination.page - 1)}
          className="px-4 py-2 border rounded text-sm disabled:opacity-50"
        >
          Trang trước
        </button>
        <button
          disabled={
            pagination.page >= Math.ceil(pagination.total / pagination.limit)
          }
          onClick={() => fetchUsers(pagination.page + 1)}
          className="px-4 py-2 border rounded text-sm disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default AdminUserPage;
