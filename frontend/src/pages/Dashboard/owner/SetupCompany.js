import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function SetupCompany() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    tax_code: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Lỗi: Bạn chưa đăng nhập.");
      return;
    }

    const { name, tax_code, address, email, phone } = form;
    if (!name || !tax_code || !address || !email || !phone) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token không tồn tại, vui lòng đăng nhập lại.");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/dashboard/owner/setupcompanyFirst",
        {
          ...form,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Nhận user mới và token mới từ backend
      const { user: updatedUser, token: newToken } = res.data;

      // Cập nhật AuthContext và localStorage
      login(updatedUser, newToken);

      alert("Tạo công ty thành công!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(
        "Lỗi tạo công ty: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Thiết lập công ty của bạn</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên công ty"
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="tax_code"
          placeholder="Mã số thuế"
          className="border p-2 w-full mb-2"
          value={form.tax_code}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Địa chỉ"
          className="border p-2 w-full mb-2"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email công ty"
          type="email"
          className="border p-2 w-full mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Số điện thoại"
          className="border p-2 w-full mb-4"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Lưu công ty
        </button>
      </form>
    </div>
  );
}

export default SetupCompany;
