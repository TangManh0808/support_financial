import { useEffect, useState } from "react";
import api from "~/lib/axios";

const useCashflow = (year) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dashboard/owner/cashflow", {
        params: { year },
      });
      setData(res.data || []);
      setError(false);
    } catch (err) {
      console.error("Lỗi khi fetch cashflow:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [year]);

  return { data, loading, error, refetch: fetch };
};

export default useCashflow;
