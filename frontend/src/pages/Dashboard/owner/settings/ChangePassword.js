// src/pages/Settings/ChangePassword.jsx
import { useState } from "react";
import axios from "~/lib/axios";

const ChangePassword = () => {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.new_password !== form.confirm_password) {
      setMessage("Mật khẩu mới không trùng khớp.");
      return;
    }

    try {
      await axios.post("dashboard/owner/settings/change-password", {
        currentPassword: form.current_password,
        newPassword: form.new_password,
      });
      setMessage("Đổi mật khẩu thành công!");
    } catch (err) {
      setMessage("Đổi mật khẩu thất bại: " + err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold">Đổi mật khẩu</h3>

      <input
        type="password"
        name="current_password"
        placeholder="Mật khẩu hiện tại"
        className="border w-full p-2 rounded"
        value={form.current_password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="new_password"
        placeholder="Mật khẩu mới"
        className="border w-full p-2 rounded"
        value={form.new_password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirm_password"
        placeholder="Xác nhận mật khẩu mới"
        className="border w-full p-2 rounded"
        value={form.confirm_password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Xác nhận
      </button>

      {message && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
};

export default ChangePassword;
