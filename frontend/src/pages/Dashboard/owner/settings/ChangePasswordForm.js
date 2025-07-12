import { useState } from "react";
import useChangePassword from "~/hooks/dashboard/owner/settings/useChangePassword";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { changePassword, loading, error, success } = useChangePassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword({ oldPassword, newPassword });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Mật khẩu hiện tại</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm">Đổi mật khẩu thành công!</div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Đang đổi..." : "Xác nhận"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
