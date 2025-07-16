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
    type: "", // 👈 thêm trường type
  });

  // Gọi API lấy danh sách
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // lấy token từ localStorage
      const res = await axios.get("http://localhost:3000/transactions", {
        params: {
          page,
          limit,
          ...filters,
        },
        headers: {
          Authorization: `Bearer ${token}`, // thêm token vào header
        },
      });
      // console.log("FETCHED:", res.data); // ❗Log để kiểm tra
      // console.log(res.data);
      setTransactions(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Lỗi khi fetch giao dịch:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  // Thêm giao dịch
  const addTransaction = async (data) => {
    try {
      const res = await axios.post("/transactions", data);
      fetchTransactions(); // Refresh lại danh sách sau khi thêm
      return res.data;
    } catch (err) {
      console.error("Lỗi khi thêm giao dịch:", err);
      throw err;
    }
  };

  // Xoá giao dịch
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/transactions/${id}`);
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
    deleteTransaction,
  };
};
