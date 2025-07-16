import { useEffect, useState } from "react";
import axios from "axios";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await axios.get("http://localhost:3000/transaction_categories", {
        headers: getAuthHeader(),
      });
      setCategories(res.data.result); // ✅
    } catch (err) {
      console.error("Lỗi khi lấy danh mục:", err);
      setError(err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const createCategory = async ({ company_id, name, type }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/transaction_categories",
        { company_id, name, type },
        { headers: getAuthHeader() }
      );
      await fetchCategories(); // Refresh danh sách sau khi thêm
      return res.data;
    } catch (err) {
      console.error("Lỗi khi tạo danh mục:", err);
      throw err;
    }
  };

  const updateCategory = async ({ id, company_id, name, type }) => {
    try {
      await axios.put(
        `http://localhost:3000/transaction_categories/${id}`,
        { company_id, name, type },
        { headers: getAuthHeader() }
      );
      await fetchCategories();
    } catch (err) {
      console.error("Lỗi khi cập nhật danh mục:", err);
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/transaction_categories/${id}`,
        { headers: getAuthHeader() }
      );
      await fetchCategories();
    } catch (err) {
      console.error("Lỗi khi xoá danh mục:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loadingCategories,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
