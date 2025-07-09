// src/hooks/useFinancialOverview.js
import { useEffect, useState } from "react";
import axios from "~/lib/axios";

const useFinancialOverview = (month) => {
  const [data, setData] = useState({
    total: 0,
    cash: 0,
    bank: 0,
    receivable: 0,
    payable: 0,
    revenue: 0,
    expense: 0,
    profit: 0,
    inventory: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/dashboard/owner/financial?month=${month}&year=2025`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Lỗi khi lấy dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [month]);

  return { data, loading, error };
};

export default useFinancialOverview;
