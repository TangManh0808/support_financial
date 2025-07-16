import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  register as registerUser,
  login as loginUser,
} from "../../services/authService";
import { useAuth } from "../../hooks/useAuth"; // ✅ Quan trọng

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Sử dụng để cập nhật context và localStorage

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Vui lòng nhập tên";
    if (!form.email) newErrors.email = "Vui lòng nhập email";
    if (!form.password) newErrors.password = "Vui lòng nhập mật khẩu";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // ✅ 1. Gọi API đăng ký
      await registerUser(form);

      // ✅ 2. Đăng nhập ngay sau khi đăng ký
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });

      // ✅ 3. Cập nhật context và localStorage
      login(res.user, res.token); // <-- dùng context login
      alert("Đăng ký thành công!");

      // ✅ 4. Chuyển tới bước setup công ty
      navigate("/setupcompanyFirst");
    } catch (err) {
      alert("Đăng ký thất bại: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT - FORM */}
      <div className="w-1/2 flex items-center justify-center bg-white px-10">
        <form className="w-[350px] space-y-5" onSubmit={handleSubmit}>
          <img
            src="http://localhost:3001/icons8-dollar-bag-50.png"
            className="h-10 mb-4"
            alt="Logo"
          />
          <h2 className="text-3xl font-bold">Create an account</h2>
          <p className="text-sm text-gray-500">Please fill in your details</p>

          <div>
            <label className="font-semibold">Username</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-sm"
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-sm"
            />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-sm"
            />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Sign up
          </button>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <a href="/login" className="text-purple-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>

      {/* RIGHT - ILLUSTRATION */}
      <div className="w-1/2 bg-purple-100 flex items-center justify-center">
        <img
          src="http://localhost:3001/anhlogin.jpg"
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
