import { useState, useEffect } from "react";
import axios from "axios";

export const useAccountantTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const [filters, setFilters] = useState({
    month: "",
    year: "",
    search: "",
    type: "", // 👈 lọc theo loại
  });

  // Lấy token từ localStorage
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Gọi API lấy danh sách giao dịch
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/transactions", {
        params: {
          page,
          limit,
          ...filters,
        },
        headers: getAuthHeader(),
      });

      setTransactions(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Lỗi khi fetch giao dịch:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Thêm giao dịch mới
  const addTransaction = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/transactions", data, {
        headers: getAuthHeader(),
      });
      alert("Thêm giao dịch thành công");
      fetchTransactions(); // Refresh sau khi thêm
      return res.data;
    } catch (err) {
      console.error("Lỗi khi thêm giao dịch:", err);
      throw err;
    }
  };
  // Thêm hàm updateTransaction vào
  const updateTransaction = async (id, data) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/transactions/${id}`,
        data,
        { headers: getAuthHeader() }
      );
      alert("Cập nhật giao dịch thành công");
      fetchTransactions(); // cập nhật danh sách sau khi sửa
      return res.data;
    } catch (err) {
      console.error("Lỗi khi cập nhật giao dịch:", err.response?.data || err);
      alert("Lỗi khi cập nhật giao dịch");
      throw err;
    }
  };

  // Xoá giao dịch theo id
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${id}`, {
        headers: getAuthHeader(),
      });
      alert("Xóa giao dịch thành công");
      // Cập nhật local sau xoá
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Lỗi khi xoá giao dịch:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, filters]);

  return {
    transactions,
    loading,
    error,
    page,
    total,
    limit,
    setPage,
    filters,
    setFilters,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};