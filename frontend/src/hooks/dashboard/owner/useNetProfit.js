import { useEffect, useState } from "react";
import api from "~/lib/axios";

const useNetProfit = (year) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/dashboard/owner/net-profit", {
          params: { year },
        });
        setData(res.data.data); // [{month: 1, revenue: ..., expense: ...}, ...]
      } catch (err) {
        setError("Không thể tải dữ liệu biểu đồ.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [year]);

  return { data, loading, error };
};

export default useNetProfit;
