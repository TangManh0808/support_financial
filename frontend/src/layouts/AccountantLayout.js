import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const AccountantLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar cố định bên trái */}
      <div className="fixed left-0 top-0 h-screen w-64 z-50">
        <Sidebar />
      </div>

      {/* Nội dung bên phải sidebar */}
      <div className="ml-64 flex flex-col w-full">
        {/* Header cố định trên cùng */}
        <div className="fixed top-0 left-64 right-0 z-40">
          <Header />
        </div>

        {/* Nội dung chính có padding top để không che header */}
        <main className="mt-[100px] p-4 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountantLayout;
