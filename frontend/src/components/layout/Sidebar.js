// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  BarChart2,
  FileText,
  Activity,
  FolderDown,
  Settings,
  LayoutDashboard,
  LogOut,
  Menu,
  ChevronRight,
  Circle,
} from "lucide-react";
import { useAuth } from "~/hooks/useAuth";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { user, logout } = useAuth();

  const basePath = user?.role === "accountant" ? "/accountant" : "/dashboard";

  const navItems = [
    { to: `${basePath}/`, icon: <LayoutDashboard size={18} />, label: "Tổng Quan", end: true },
    { to: `${basePath}/transactions`, icon: <FileText size={18} />, label: "Giao dịch" },
    { to: `${basePath}/reports`, icon: <BarChart2 size={18} />, label: "Báo Cáo" },
    { to: `${basePath}/analyses`, icon: <Activity size={18} />, label: "Phân tích Tài chính" },
    { to: `${basePath}/exports`, icon: <FolderDown size={18} />, label: "Xuất" },
    { to: `${basePath}/settings`, icon: <Settings size={18} />, label: "Cài đặt hệ thống" },
  ];

  return (
    <aside
      className={`bg-[#0f172a] text-white transition-all duration-300 flex flex-col 
      ${isCollapsed ? "w-[72px]" : "w-64"} min-h-screen`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!isCollapsed && (
          <h1 className="text-2xl font-extrabold tracking-wide text-purple-400">
            <span className="text-white">Biz</span>Manage
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center justify-between gap-3 ${
                isCollapsed ? "px-2 py-3" : "px-4 py-3"
              } rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-700 text-white font-semibold"
                  : "hover:bg-blue-800 text-blue-100"
              }`
            }
          >
            <div className="flex items-center gap-3">
              {icon}
              {!isCollapsed && <span className="text-sm">{label}</span>}
            </div>
            <div>
              <NavLink
                to={to}
                end={end}
                children={({ isActive }) =>
                  isActive ? (
                    <ChevronRight size={16} className="text-purple-300" />
                  ) : (
                    <Circle size={8} className="text-purple-300" />
                  )
                }
              />
            </div>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="py-4 px-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-red-600 hover:bg-red-500 transition"
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
