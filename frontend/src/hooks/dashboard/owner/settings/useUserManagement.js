import { useState, useEffect } from "react";
import axios from "~/lib/axios";

const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/dashboard/owner/settings/users");
      setUsers(res.data); // giả sử trả về mảng user
    } catch (err) {
      setError("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Thêm người dùng mới
const addUser = async (newUser) => {
  try {
    const res = await axios.post("/dashboard/owner/settings/users", newUser);
    await fetchUsers(); // ✅ đảm bảo dữ liệu đồng bộ
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || "Lỗi thêm người dùng",
    };
  }
};

  // ✅ Cập nhật thông tin người dùng
  const updateUser = async (id, updatedUser) => {
    try {
      await axios.put(`/dashboard/owner/settings/users/${id}`, updatedUser);
      await fetchUsers(); // ✅ Gọi lại danh sách sau khi sửa
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Lỗi cập nhật người dùng",
      };
    }
  };

  // ✅ Xóa người dùng
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/dashboard/owner/settings/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Lỗi xóa người dùng",
      };
    }
  };

  // ✅ Tự động load danh sách khi hook được sử dụng
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
};

export default useUserManagement;
