import { Card, CardContent } from "~/components/ui/card";
import { useAdminActivityLogs } from "~/hooks/dashboard/admin/useAdminActivityLogs";

const AdminActivityLogsPage = () => {
  const {
    logs,
    search,
    setSearch,
    pagination,
    loading,
    fetchLogs,
    handleSearch,
  } = useAdminActivityLogs();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Nhật ký hoạt động</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email, công ty, hành động..."
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
                <th className="p-2">Người dùng</th>
                <th className="p-2">Vai trò</th>
                <th className="p-2">Công ty</th>
                <th className="p-2">Hành động</th>
                <th className="p-2">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-6">
                    Đang tải...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-b text-sm">
                    <td className="p-2">{log.user_name || "—"}</td>
                    <td className="p-2 capitalize">{log.user_role}</td>
                    <td className="p-2">{log.company_name || "—"}</td>
                    <td className="p-2">{log.action}</td>
                    <td className="p-2 text-gray-500">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2 mt-4">
        <button
          disabled={pagination.page <= 1}
          onClick={() => fetchLogs(pagination.page - 1)}
          className="px-4 py-2 border rounded text-sm disabled:opacity-50"
        >
          Trang trước
        </button>
        <button
          disabled={
            pagination.page >= Math.ceil(pagination.total / pagination.limit)
          }
          onClick={() => fetchLogs(pagination.page + 1)}
          className="px-4 py-2 border rounded text-sm disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default AdminActivityLogsPage;
