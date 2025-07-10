import { useEffect, useState } from "react";
import api from "~/lib/axios";

const useRevenueTimeline = (year) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      setData([]);
      const res = await api.get("/dashboard/owner/revenue-timeline", {
        params: { year },
      });

      const rawData = res.data || [];

      // Group theo tháng (T1 -> T12)
      const groupedData = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const monthData = rawData.filter((item) => {
          const date = new Date(item.label);
          return date.getMonth() + 1 === month; // getMonth: 0-11
        });

        const total = monthData.reduce(
          (sum, item) => sum + parseFloat(item.totalRevenue || 0),
          0
        );

        return {
          month: `T${month}`,
          totalRevenue: total,
        };
      });

      setData(groupedData);
    } catch (e) {
      console.error("Lỗi khi fetch revenue timeline:", e);
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

export default useRevenueTimeline;
