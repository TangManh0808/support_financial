import axios from "axios";
import { useState } from "react";

export function useExportReport() {
  const [loading, setLoading] = useState(false);

  const exportReport = async ({ reportType, month, year }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/dashboard/owner/exports/${reportType}`,
        {
          params: { month, year },
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${reportType}_${month}_${year}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("❌ Lỗi xuất báo cáo:", err);
      alert("Xuất báo cáo thất bại");
    } finally {
      setLoading(false);
    }
  };

  return { exportReport, loading };
}
