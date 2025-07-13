// components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  BarChart2,
  FileText,
  Activity,
  FolderDown,
  Settings,
  LayoutDashboard,
} from "lucide-react";

const navItems = [
  {
    to: "/dashboard/",
    icon: <LayoutDashboard size={18} />,
    label: "Tổng Quan",
    end: true, // ✅ cần truyền xuống NavLink
  },
  {
    to: "/dashboard/transactions",
    icon: <FileText size={18} />,
    label: "Giao dịch",
  },
  {
    to: "/dashboard/reports",
    icon: <BarChart2 size={18} />,
    label: "Báo Cáo",
  },
  {
    to: "/dashboard/analyses",
    icon: <Activity size={18} />,
    label: "Phân tích Tài chính",
  },
  {
    to: "/dashboard/exports",
    icon: <FolderDown size={18} />,
    label: "Xuất",
  },
  {
    to: "/dashboard/settings",
    icon: <Settings size={18} />,
    label: "Cài đặt hệ thống",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#0f172a] text-white min-h-screen px-5 py-6 space-y-8">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">BizManage</div>

      {/* Menu */}
      <nav className="space-y-1">
        {navItems.map(({ to, icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end} // ✅ Truyền vào đây
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
      ${
        isActive
          ? "bg-blue-700 text-white font-semibold"
          : "hover:bg-blue-800 text-blue-100"
      }`
            }
          >
            {icon}
            <span className="text-sm">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
