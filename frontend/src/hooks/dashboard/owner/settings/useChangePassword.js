import { useState } from "react";
import axios from "~/lib/axios";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const changePassword = async ({ oldPassword, newPassword }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post("/settings/change-password", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, success };
};

export default useChangePassword;
