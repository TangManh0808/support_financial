import React from "react";
import { formatCurrency } from "~/utils/format";

const IncomeStatement = ({ data }) => {
  if (!data) return null;
  // console.log(data.data);

  // 👇 Lấy dữ liệu từ cấu trúc lồng nhau
  const report = data || {};
  console.log(report);

  const {
    revenue = 0,
    costOfGoodsSold = 0,
    grossProfit = 0,
    sellingExpenses = 0,
    adminExpenses = 0,
    depreciation = 0,
    leasingCosts = 0,
    operatingProfit = 0,
    corporateTax = 0,
    netProfit = 0,
  } = report;

  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-200 text-[15px] space-y-4 transition hover:shadow-xl">
      <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
        📈 <span>Báo Cáo Kết Quả Kinh Doanh</span>
      </h2>
      <ul className="space-y-2 text-gray-700 ml-2">
        <li>
          • Doanh thu:{" "}
          <strong className="text-black">{formatCurrency(revenue)}</strong>
        </li>
        <li>
          • Giá vốn hàng bán: <strong>{formatCurrency(costOfGoodsSold)}</strong>
        </li>
        <li>
          • Lợi nhuận gộp: <strong>{formatCurrency(grossProfit)}</strong>
        </li>
        <li>
          • Chi phí bán hàng: <strong>{formatCurrency(sellingExpenses)}</strong>
        </li>
        <li>
          • Chi phí quản lý doanh nghiệp:{" "}
          <strong>{formatCurrency(adminExpenses)}</strong>
        </li>
        <li>
          • Khấu hao: <strong>{formatCurrency(depreciation)}</strong>
        </li>
        <li>
          • Chi phí thuê ngoài: <strong>{formatCurrency(leasingCosts)}</strong>
        </li>
        <li>
          • Lợi nhuận trước thuế:{" "}
          <strong>{formatCurrency(operatingProfit)}</strong>
        </li>
        <li>
          • Thuế TNDN: <strong>{formatCurrency(corporateTax)}</strong>
        </li>
        <li className="text-black font-bold text-base mt-2">
          🔸 Lợi nhuận sau thuế:{" "}
          <span className={netProfit >= 0 ? "text-green-600" : "text-red-600"}>
            {formatCurrency(netProfit)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default IncomeStatement;
