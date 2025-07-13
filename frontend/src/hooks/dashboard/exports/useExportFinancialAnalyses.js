import { useEffect, useState } from "react";
import axios from "~/lib/axios";

const useExportFinancialAnalyses = (month, year) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/reports/files", {
          params: { month, year },
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError("Không thể tải chỉ số phân tích");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (month && year) {
      fetchAnalyses();
    }
  }, [month, year]);

  return { data, loading, error };
};

export default useExportFinancialAnalyses;
