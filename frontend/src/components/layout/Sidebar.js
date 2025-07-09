// components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { BarChart2, FileText, Users, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen p-4 space-y-6">
      {/* Logo */}
      <div className="text-2xl font-bold">BizManage</div>

      {/* Menu */}
      <nav className="space-y-2">
        <NavLink
          to="/dashboard/"
          className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded"
        >
          <BarChart2 size={18} /> Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded"
        >
          <FileText size={18} /> Giao dịch
        </NavLink>
        <NavLink
          to="/reports"
          className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded"
        >
          <Users size={18} /> Báo Cáo
        </NavLink>
        <NavLink
          to="/analyses"
          className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded"
        >
          <Users size={18} /> Phân tích Tài chính
        </NavLink>
        <NavLink
          to="/files"
          className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded"
        >
          <Users size={18} /> Xuất
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded"
        >
          <Settings size={18} /> Cài đặt hệ thống
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
