// src/hooks/dashboard/admin/useAdminCategories.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useAdminCategories = (search, page = 1, limit = 10) => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");

        const res = await axios.get("http://localhost:3000/admin/categories", {
          params: { page, limit, search },
          headers: { Authorization: `Bearer ${token}` },
        });

        setCategories(res.data.data.categories);
        setPagination(res.data.data.pagination);
      } catch (err) {
        console.error("Lỗi khi fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [search, page]);

  return { categories, pagination, loading };
};
