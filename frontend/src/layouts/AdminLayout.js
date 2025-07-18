// src/layouts/AdminLayout.jsx
import SidebarAdmin from "~/components/layout/admin/SidebarAdmin";
import HeaderAdmin from "~/components/layout/admin/HeaderAdmin";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdmin isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        {/* HEADER DÍNH TRÊN */}
        <div className="sticky top-0 z-50 bg-white shadow">
          <HeaderAdmin toggleSidebar={toggleSidebar} />
        </div>

        {/* MAIN CONTENT CUỘN ĐƯỢC */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
