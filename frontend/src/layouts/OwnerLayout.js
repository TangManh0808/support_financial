// layouts/OwnerLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const OwnerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar cố định bên trái */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header cố định trên */}
        <Header />

        {/* Nội dung trang con nằm trong Outlet */}
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
