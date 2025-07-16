// components/layout/Header.jsx
import { useAuth } from "~/hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  const greeting =
    user?.role === "owner"
      ? "Chủ doanh nghiệp"
      : user?.role === "accountant"
      ? "Kế toán"
      : "Người dùng";

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold">Xin chào, {greeting}</h1>
        <span className="text-sm text-gray-500">Dashboard / Home</span>
      </div>
      <div className="flex items-center gap-4">
        <button>🔔</button>
        <button>📧</button>
        <div className="font-semibold">
          {user?.name || "Người dùng"} ⌄
        </div>
      </div>
    </header>
  );
};

export default Header;
