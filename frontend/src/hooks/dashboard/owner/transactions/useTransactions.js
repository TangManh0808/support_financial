import { useEffect, useState } from "react";
import api from "~/lib/axios";

const useTransactions = ({ month, year, search, page, limit }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0); // Số lượng bản ghi
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/transactions", {
        params: {
          month,
          year,
          search,
          page,
          limit,
        },
      });
      setData(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Lỗi gọi API transactions:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, year, search, page, limit]);

  return { data, total, loading, error };
};

export default useTransactions;
