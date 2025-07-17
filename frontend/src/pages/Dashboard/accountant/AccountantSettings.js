// src/pages/Settings/SettingsPage.jsx
import { useState } from "react";
import CompanyInfo from "../owner/settings/CompanyInfo";
import ChangePassword from "../owner/settings/ChangePassword";

const TABS = [
  { id: "company", label: "Thông tin công ty" },
  { id: "password", label: "Đổi mật khẩu" },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("company");

  const renderTabContent = () => {
    switch (activeTab) {
      case "company":
        return <CompanyInfo />;
      case "password":
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <div className="px-6 py-6 max-w-6xl mx-auto bg-white shadow rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Cài đặt hệ thống</h2>

      <div className="flex space-x-6 border-b pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 text-lg font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};

export default SettingsPage;
