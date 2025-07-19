import { useAuth } from "~/hooks/useAuth";
import { Bell, Mail, ChevronDown } from "lucide-react";

const Header = ({ sidebarWidth }) => {
  const { user } = useAuth();

  const greeting =
    user?.role === "owner"
      ? "Chủ doanh nghiệp"
      : user?.role === "accountant"
      ? "Kế toán"
      : "Người dùng";

  return (
    <header
      className="fixed top-0 z-40 h-[80px] bg-white shadow flex items-center justify-between px-6 transition-all duration-300"
      style={{
        left: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-gray-800">
          Xin chào, {greeting}
        </h1>
        <span className="text-sm text-gray-500">Dashboard / Home</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-black">
          <Bell size={20} />
        </button>
        <button className="text-gray-600 hover:text-black">
          <Mail size={20} />
        </button>
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover border"
          />
          <span className="font-semibold text-gray-800 whitespace-nowrap">
            {user?.name || "Người dùng"}
          </span>
          <ChevronDown size={18} className="text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default Header;
