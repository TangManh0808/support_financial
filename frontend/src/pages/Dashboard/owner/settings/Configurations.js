import { useEffect, useState } from "react";
import axios from "~/lib/axios";

const keyLabels = {
  mode: "Giao diện",
  decimal_digits: "Số chữ số thập phân",
  currency: "Đơn vị tiền tệ",
  language: "Ngôn ngữ",
  show_advanced_reports: "Hiện báo cáo nâng cao",
};

const Configurations = () => {
  const [configs, setConfigs] = useState(null);

  useEffect(() => {
    axios.get("/dashboard/owner/settings/config").then((res) => {
      if (res.data && typeof res.data === "object") {
        setConfigs(res.data);
      }
    });
  }, []);

  const handleChange = (key, value) => {
    setConfigs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    await axios.post("/dashboard/owner/settings/config", configs);
    alert("Lưu cấu hình thành công");
  };

  if (!configs) return <p className="text-gray-500">Đang tải cấu hình...</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Cấu hình hệ thống</h2>

      <div className="grid gap-6">
        {Object.entries(configs).map(([key, value]) => (
          <div key={key} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <label className="w-full md:w-1/3 font-medium text-gray-700">
              {keyLabels[key] || key}
            </label>

            {typeof value === "boolean" ? (
              <select
                value={value ? "true" : "false"}
                className="w-full md:w-2/3 border p-2 rounded"
                onChange={(e) =>
                  handleChange(key, e.target.value === "true" ? true : false)
                }
              >
                <option value="true">Bật</option>
                <option value="false">Tắt</option>
              </select>
            ) : (
              <input
                className="w-full md:w-2/3 border p-2 rounded"
                type={typeof value === "number" ? "number" : "text"}
                value={value}
                onChange={(e) =>
                  handleChange(
                    key,
                    typeof value === "number"
                      ? Number(e.target.value)
                      : e.target.value
                  )
                }
              />
            )}
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          💾 Lưu cấu hình
        </button>
      </div>
    </div>
  );
};

export default Configurations;
