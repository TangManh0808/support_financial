import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const OwnerLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 72 : 290;

  return (
    <div>
      {/* Sidebar */}
      <div
        className="fixed left-0 top-0 h-screen z-50 transition-all duration-300"
        style={{ width: `${sidebarWidth}px` }}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Header */}
      <Header sidebarWidth={sidebarWidth} />

      {/* Main content */}
      <main
        className="pt-[88px] bg-gray-100 min-h-screen transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;
