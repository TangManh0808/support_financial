// src/hooks/useRevenueExpense.js
import { useState, useEffect } from "react";
import api from "~/lib/axios";

const useRevenueExpense = (year) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/dashboard/owner/revenue-expense", {
          params: { year },
        });
        setData(res.data.data);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu doanh thu & chi phí");
      }
    };
    fetch();
  }, [year]);

  return { data, error };
};

export default useRevenueExpense;
