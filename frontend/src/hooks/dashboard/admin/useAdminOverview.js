import { useEffect, useState } from "react";
import axios from "axios";

export const useAdminOverview = (selectedYear) => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // ✅ Lấy token từ localStorage

        const res = await axios.get(
          `http://localhost:3000/admin/overview?year=${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Gắn vào Authorization header
            },
          }
        );
        // console.log(res.data);

        setOverview(res.data.data);
      } catch (err) {
        console.error("Lỗi khi lấy admin overview:", err);
        setOverview(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [selectedYear]);

  return { overview, loading };
};
