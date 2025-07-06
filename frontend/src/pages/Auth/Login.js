// import { useState } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI(form);
      login({ user: res.user, token: res.token });
      navigate("/dashboard");
      alert("Đăng nhập thành công");
    } catch (err) {
      alert(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT - FORM */}
      <div className="md:w-1/2 flex items-center justify-center bg-white px-6 md:px-10">
        <form
          className="w-full max-w-sm space-y-5"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <img
            src="/icons8-dollar-bag-50.png"
            className="h-10 mb-2 mx-auto"
            alt="Logo"
          />

          <h2 className="text-2xl font-bold text-center">Welcome back</h2>
          <p className="text-sm text-gray-500 text-center">
            Please enter your details
          </p>

          <div>
            <label className="text-sm block mb-1">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              autoComplete="off"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember for 30 days
            </label>
            <a href="#" className="text-purple-600 hover:underline">
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Sign in
          </button>

          <button
            type="button"
            className="w-full border py-2 rounded flex items-center justify-center text-sm hover:bg-gray-50"
          >
            <img
              src="/icons8-google-logo-48.png"
              className="w-5 h-5 mr-2"
              alt="Google"
            />
            Sign in with Google
          </button>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-purple-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>

      {/* RIGHT - ILLUSTRATION */}
      <div className="md:w-1/2 bg-purple-100 flex items-center justify-center">
        <img
          src="/anhlogin.jpg"
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
