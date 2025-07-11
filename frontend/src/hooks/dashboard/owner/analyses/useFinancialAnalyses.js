import { useEffect, useState } from "react";
import axios from "~/lib/axios";

const useFinancialAnalyses = ({ month, year }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!month || !year) return;
    const fetchData = async () => {
      try {
        const res = await axios.get("/dashboard/owner/analyses", {
          params: { month, year },
        });
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy chỉ số phân tích:", err);
      }
    };

    fetchData();
  }, [month, year]);

  return data;
};

export default useFinancialAnalyses;
