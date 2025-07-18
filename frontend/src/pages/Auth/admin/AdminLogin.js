import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/auth/login", form);
      const { token, user } = res.data;

      if (user.role !== "admin") {
        setError("You are not authorized as admin.");
        return;
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT - FORM */}
      <div className="w-1/2 flex items-center justify-center bg-white px-10">
        <form className="w-[350px] space-y-5" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-2">Admin Login</h2>
          <p className="text-sm text-gray-500">Enter your admin credentials</p>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full p-2 border rounded mt-1 text-sm"
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 border rounded mt-1 text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
      </div>

      {/* RIGHT - IMAGE */}
      <div className="w-1/2 bg-purple-100 flex items-center justify-center">
        <img
          src="http://localhost:3001/anhlogin.jpg"
          alt="Admin"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
