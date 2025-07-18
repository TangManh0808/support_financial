import { useState, useEffect } from "react";
import axios from "axios";

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/admin/users", {
        params: { page, limit: 10, search },
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data.users);
      setPagination(res.data.data.pagination);
    } catch (error) {
      console.error("Lỗi khi fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const handleLock = async (id) => {
    await axios.put(
      `http://localhost:3000/admin/users/${id}/lock`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers(pagination.page);
  };

  const handleUnlock = async (id) => {
    await axios.put(
      `http://localhost:3000/admin/users/${id}/unlock`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers(pagination.page);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers(pagination.page);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  return {
    users,
    pagination,
    loading,
    search,
    setSearch,
    fetchUsers,
    handleSearch,
    handleLock,
    handleUnlock,
    handleDelete,
  };
};

export default useAdminUsers;
