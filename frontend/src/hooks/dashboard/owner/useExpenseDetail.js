import { useEffect, useState } from "react";
import api from "~/lib/axios";

const useExpenseDetail = (year) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = async () => {
    try {
      const res = await api.get("/dashboard/owner/expense-detail", {
        params: { year },
      });
      setData(res.data.data);
    } catch (e) {
      setError("Lỗi khi lấy dữ liệu chi phí");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [year]);

  return { data, loading, error };
};

export default useExpenseDetail;
