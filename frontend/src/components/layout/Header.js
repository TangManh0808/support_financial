// components/layout/Header.jsx
const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold">Xin chào, Chủ doanh nghiệp</h1>
        <span className="text-sm text-gray-500">Dashboard / Home</span>
      </div>
      <div className="flex items-center gap-4">
        <button>🔔</button>
        <button>📧</button>
        <div className="font-semibold">John ⌄</div>
      </div>
    </header>
  );
};

export default Header;
