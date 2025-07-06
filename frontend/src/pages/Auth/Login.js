import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { login as loginAPI } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // console.log("Hàm login từ context:", login);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI(form);
      // console.log(res);
      // console.log("trả về res.dât:", res.data);
      // login(res.user); // Cập nhật context và localStorage
      login({ user: res.user, token: res.token });

      // console.log("res.data từ API:", res.user, res.token);

      navigate("/dashboard"); // chuyển hướng
      alert("Đăng nhập thanh cong");
    } catch (err) {
      alert(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Đăng nhập
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
