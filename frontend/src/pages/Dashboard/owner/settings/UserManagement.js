// src/pages/dashboard/Owner/UserManagement.jsx
import { useEffect, useState } from "react";
import useUserManagement from "~/hooks/dashboard/owner/settings/useUserManagement";

const UserManagement = () => {
  const { users, refetch , addUser, updateUser, deleteUser } =
    useUserManagement();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "accountant",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "accountant",
  });

  useEffect(() => {
    refetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email)
      return alert("Vui lòng nhập đầy đủ thông tin");
    const res = await addUser(newUser);
    if (res.success) {
      alert("Thêm người dùng thành công");
      setNewUser({ name: "", email: "", role: "accountant" });
    } else alert(res.error);
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleUpdateUser = async () => {
   const res = await updateUser(editingUser, formData);
    if (res.success) {
      alert("Cập nhật thành công");
      setEditingUser(null);
    } else alert(res.error);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa người dùng này?")) return;
    const res = await deleteUser(id);
    if (!res.success) alert(res.error);
  };

return (
  <div className="space-y-8 max-w-5xl mx-auto px-4">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Quản lý người dùng</h2>

    {/* Thêm người dùng */}
    <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700">Thêm người dùng</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Tên"
          name="name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          className="border p-2 rounded w-full"
          name="role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="accountant">accountant</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <button
        onClick={handleAddUser}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Thêm người dùng
      </button>
    </div>

    {/* Danh sách người dùng */}
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border shadow-md rounded-md">
        <thead className="bg-blue-100 text-gray-700 text-lg">
          <tr>
            <th className="p-3 text-left">👤 Tên</th>
            <th className="p-3 text-left">📧 Email</th>
            <th className="p-3 text-left">🎯 Vai trò</th>
            <th className="p-3 text-center">⚙️ Hành động</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-base">
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                {editingUser === user.id ? (
                  <input
                    className="border p-2 rounded w-full"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="p-3">
                {editingUser === user.id ? (
                  <input
                    className="border p-2 rounded w-full"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="p-3 capitalize">
                {editingUser === user.id ? (
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="accountant">accountant</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="p-3 text-center space-x-2">
                {editingUser === user.id ? (
                  <>
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={handleUpdateUser}
                    >
                      Lưu
                    </button>
                    <button
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      onClick={() => setEditingUser(null)}
                    >
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(user)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDelete(user.id)}
                    >
                      Xóa
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default UserManagement;
