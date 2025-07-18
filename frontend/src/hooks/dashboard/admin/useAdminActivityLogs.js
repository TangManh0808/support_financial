import { useEffect, useState } from "react";
import axios from "axios";

export const useAdminActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchLogs = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      const res = await axios.get("http://localhost:3000/admin/activity-logs", {
        params: { page, limit: 10, search },
        headers: { Authorization: `Bearer ${token}` },
      });

      setLogs(res.data.data.logs);
      setPagination(res.data.data.pagination);
    } catch (err) {
      console.error("Lỗi khi lấy activity logs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLogs(1);
  };

  useEffect(() => {
    fetchLogs(1);
  }, []);

  return {
    logs,
    search,
    setSearch,
    pagination,
    loading,
    fetchLogs,
    handleSearch,
  };
};
