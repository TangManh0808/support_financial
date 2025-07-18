// src/hooks/useAdminCompanies.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useAdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:3000/admin/companies", {
        params: { page, limit: 10, search },
        headers: { Authorization: `Bearer ${token}` },
      });

      setCompanies(res.data.data.companies);
      setPagination(res.data.data.pagination);
    } catch (err) {
      console.error("Lỗi khi lấy công ty:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCompanies(1);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/admin/companies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCompanies(pagination.page);
    } catch (err) {
      console.error("Lỗi khi xóa công ty:", err);
    }
  };

  useEffect(() => {
    fetchCompanies(1);
  }, []);

  return {
    companies,
    search,
    setSearch,
    pagination,
    loading,
    fetchCompanies,
    handleSearch,
    handleDelete,
  };
}
