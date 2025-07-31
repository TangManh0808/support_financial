import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  return (
    <header className="fixed top-0 w-full bg-white shadow-lg z-20">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="text-2xl font-bold text-green-600">BizManager</div>
        <nav className="hidden md:flex space-x-8 text-gray-700">
          <button>Home</button>
          <button>Tính năng</button>
          <button>Báo cáo</button>
          <button>Giá cả</button>
        </nav>
        <div className="flex space-x-4">
          <button onClick={() => nav("/login")} className="text-gray-700 hover:text-green-600">Đăng nhập</button>
          <button onClick={() => nav("/register")} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">Đăng ký</button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
