import { useState, useEffect } from "react";
import axios from "~/lib/axios";

const BASE_API_URL = "http://localhost:3000";

const useCompanyLogo = () => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogo = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const res = await axios.get("/dashboard/owner/settings/files/logo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.file_url) {
        setLogoUrl(BASE_API_URL + res.data.file_url); // Gắn domain đầy đủ
      }
    } catch (err) {
      setError("Không thể tải logo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const uploadLogo = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_type", "logo");

    try {
      const res = await axios.post(
        "/dashboard/owner/settings/files/logo",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const fullUrl = BASE_API_URL + res.data.data.file_url;
      setLogoUrl(fullUrl); // Gắn domain đầy đủ
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Lỗi tải logo",
      };
    }
  };

  return { logoUrl, loading, error, uploadLogo };
};

export default useCompanyLogo;
