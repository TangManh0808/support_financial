import { Bell, Menu } from "lucide-react";

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar}>
          <Menu size={24} className="text-gray-700" />
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="border rounded px-3 py-1 text-sm focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-4">
        <Bell className="text-gray-600" />
        <img
          src="https://i.pravatar.cc/30"
          alt="Avatar"
          className="rounded-full w-8 h-8"
        />
      </div>
    </header>
  );
};

export default AdminHeader;
