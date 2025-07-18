// src/components/layout/SidebarAdmin.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LogOut, ChevronRight, Circle, Menu } from "lucide-react";

const adminMenus = [
  { label: "Tổng quan", path: "/admin-dashboard" },
  { label: "Người dùng", path: "/admin-dashboard/users" },
  { label: "Công ty", path: "/admin-dashboard/companies" },
  { label: "Danh mục", path: "/admin-dashboard/categories" },
  { label: "Lịch sử hoạt động", path: "/admin-dashboard/activity-logs" },
];

const SidebarAdmin = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/admin/login";
  };

  return (
    <div
      className={`bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-[72px]" : "w-72"
      }`}
    >
      {/* PHẦN TRÊN */}
      <div className="flex-1 overflow-y-auto">
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          {!isCollapsed && (
            <h1 className="text-2xl font-extrabold tracking-wide text-purple-400">
              <span className="text-white">Biz</span>Manage
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4 space-y-1">
          {adminMenus.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`flex items-center justify-between ${
                  isCollapsed ? "px-2 py-3" : "px-4 py-3"
                } rounded-md hover:bg-gray-800 transition ${
                  isActive ? "bg-gray-800 font-semibold" : "text-gray-300"
                }`}
              >
                {!isCollapsed && <span>{menu.label}</span>}
                <span className="ml-auto">
                  {isActive ? (
                    <ChevronRight
                      size={16}
                      className="text-purple-400 inline-block"
                    />
                  ) : (
                    <Circle size={8} className="text-purple-400 inline-block" />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* PHẦN DƯỚI - LOGOUT */}
      <div className="py-4 px-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-red-600 hover:bg-red-500 transition"
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
