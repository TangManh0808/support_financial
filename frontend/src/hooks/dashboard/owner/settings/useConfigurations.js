import { useState, useEffect } from "react";
import axios from "~/lib/axios";

const useConfiguration = () => {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // ✅ Lấy dữ liệu cấu hình
  const fetchConfig = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/settings/config");
      setConfig(res.data);
    } catch (err) {
      setError("Không thể tải cấu hình");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Gửi cấu hình mới lên server
  const saveConfig = async (newConfig) => {
    try {
      setSaving(true);
      setSuccess(false);
      await axios.post("/settings/config", newConfig);
      setConfig(newConfig);
      setSuccess(true);
    } catch (err) {
      setError("Lỗi khi lưu cấu hình");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return {
    config,
    loading,
    saving,
    error,
    success,
    saveConfig,
  };
};

export default useConfiguration;
