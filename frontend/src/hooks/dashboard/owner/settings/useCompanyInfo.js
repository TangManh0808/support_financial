// src/hooks/dashboard/owner/settings/useCompanyInfo.js
import { useEffect, useState } from "react";
import axios from "~/lib/axios";

const useCompanyInfo = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/dashboard/owner/settings/company")
      .then((res) => {
        setCompany(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải thông tin công ty");
        setLoading(false);
      });
  }, []);

  const updateCompany = async (data) => {
    try {
      // Bỏ các trường không nên gửi
      const payload = { ...data };
      delete payload.created_at;
      delete payload.updated_at;

      const res = await axios.put(
        `/dashboard/owner/settings/company/${data.id}`,
        payload
      );

      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Lỗi cập nhật",
      };
    }
  };

  return { company, loading, error, updateCompany };
};

export default useCompanyInfo;
