import { useEffect, useState } from "react";
import { useAccountantAnalyses } from "~/hooks/dashboard/accountant/analyses/useAccountantAnalyses";

const FIELDS = {
  balance: [
    "cash_and_equivalents", "receivables", "inventory", "fixed_assets",
    "long_term_investments", "short_term_debt", "long_term_debt",
    "capital_contribution", "retained_earnings", "reserves", "tax_other",
  ],
  income: [
    "selling_expenses", "admin_expenses", "corporate_tax",
    "depreciation", "leasing_costs",
  ],
  cashflow: ["cash_on_hand", "bank_balance"],
};

const FIELD_LABELS = {
  cash_and_equivalents: "Tiền và tương đương tiền",
  receivables: "Phải thu",
  inventory: "Hàng tồn kho",
  fixed_assets: "Tài sản cố định",
  long_term_investments: "Đầu tư dài hạn",
  short_term_debt: "Nợ ngắn hạn",
  long_term_debt: "Nợ dài hạn",
  capital_contribution: "Vốn góp",
  retained_earnings: "LN chưa phân phối",
  reserves: "Quỹ dự phòng",
  tax_other: "Thuế khác",

  selling_expenses: "Chi phí bán hàng",
  admin_expenses: "Chi phí QLDN",
  corporate_tax: "Thuế TNDN",
  depreciation: "Khấu hao",
  leasing_costs: "Chi phí thuê ngoài",

  cash_on_hand: "Tiền mặt",
  bank_balance: "Số dư ngân hàng",
};

const AccountantAnalyses = () => {
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(2025);

  const { inputs, fetchInputs, saveInput, updateInput, deleteInput } =
    useAccountantAnalyses();

  const [values, setValues] = useState({}); // field: value

  useEffect(() => {
    fetchInputs({ month, year });
  }, [month, year]);

  useEffect(() => {
    const map = {};
    inputs.forEach((i) => (map[i.field] = { ...i }));
    setValues(map);
  }, [inputs]);

  const handleChange = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: { ...prev[field], value },
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));

    const company_id = payload.company_id;

    for (const field in values) {
      const item = values[field];
      const data = {
        company_id,
        year,
        month,
        field,
        value: +item.value || 0,
      };

      if (item?.id) {
        await updateInput(item.id, data);
      } else {
        await saveInput(data);
      }
    }

    alert("Lưu thành công");
    fetchInputs({ month, year });
  };

  const renderGroup = (fields, title) => (
    <div className="p-4 border rounded mb-6">
      <h2 className="font-semibold text-lg mb-3">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm text-gray-600">{FIELD_LABELS[field]}</label>
            <input
              type="number"
              value={values[field]?.value || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              className="border px-2 py-1 rounded"
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-4">
        <select
          value={month}
          onChange={(e) => setMonth(+e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(+e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              Năm {y}
            </option>
          ))}
        </select>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lưu chỉ số
        </button>
      </div>

      {renderGroup(FIELDS.balance, "📊 Cân đối kế toán")}
      {renderGroup(FIELDS.income, "📈 Báo cáo KQKD")}
      {renderGroup(FIELDS.cashflow, "💵 Báo cáo dòng tiền")}
    </div>
  );
};

export default AccountantAnalyses;
