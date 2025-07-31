import { useEffect, useState } from "react";
import axios from "axios";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy token
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Gọi API lấy danh sách danh mục
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await axios.get("http://localhost:3000/transaction_categories", {
        headers: getAuthHeader(),
      });

      // ✅ Chỉ lấy phần `result.data` là mảng categories
      const list = res.data?.result?.data || [];
      setCategories(list);
    } catch (err) {
      console.error("Lỗi khi lấy danh mục:", err);
      setError(err);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Gọi khi load lần đầu
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loadingCategories,
    error,
    fetchCategories,
  };
};
