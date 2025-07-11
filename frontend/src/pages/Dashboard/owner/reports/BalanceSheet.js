import React from "react";
import { formatCurrency } from "~/utils/format";

const BalanceSheet = ({ data }) => {
  const { assets, liabilities, equity } = data || {};

  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-200 text-[15px] space-y-4 transition hover:shadow-xl">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
        📘 <span>Bảng Cân Đối Kế Toán</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tài sản */}
        <div>
          <h3 className="font-semibold text-blue-600 text-lg mb-1">TÀI SẢN</h3>

          <p className="font-bold mt-2">I. Tài sản ngắn hạn</p>
          <ul className="ml-4 space-y-1 text-gray-700">
            <li>• Tiền mặt: <strong>{formatCurrency(assets?.shortTerm?.cash)}</strong></li>
            <li>• Số dư ngân hàng: <strong>{formatCurrency(assets?.shortTerm?.bank)}</strong></li>
            <li>• Khoản phải thu: <strong>{formatCurrency(assets?.shortTerm?.receivables)}</strong></li>
            <li>• Hàng tồn kho: <strong>{formatCurrency(assets?.shortTerm?.inventory)}</strong></li>
          </ul>

          <p className="font-bold mt-4">II. Tài sản dài hạn</p>
          <ul className="ml-4 space-y-1 text-gray-700">
            <li>• Tài sản cố định: <strong>{formatCurrency(assets?.longTerm?.fixedAssets)}</strong></li>
            <li>• Đầu tư dài hạn: <strong>{formatCurrency(assets?.longTerm?.longTermInvestments)}</strong></li>
          </ul>
        </div>

        {/* Nguồn vốn */}
        <div>
          <h3 className="font-semibold text-blue-600 text-lg mb-1">NGUỒN VỐN</h3>

          <p className="font-bold mt-2">I. Nợ phải trả</p>
          <ul className="ml-4 space-y-1 text-gray-700">
            <li>• Nợ ngắn hạn: <strong>{formatCurrency(liabilities?.shortTermDebt)}</strong></li>
            <li>• Nợ dài hạn: <strong>{formatCurrency(liabilities?.longTermDebt)}</strong></li>
          </ul>

          <p className="font-bold mt-4">II. Vốn chủ sở hữu</p>
          <ul className="ml-4 space-y-1 text-gray-700">
            <li>• Vốn góp: <strong>{formatCurrency(equity?.capital)}</strong></li>
            <li>• Lợi nhuận chưa phân phối: <strong>{formatCurrency(equity?.retainedEarnings)}</strong></li>
            <li>• Quỹ phát triển: <strong>{formatCurrency(equity?.developmentFunds)}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;
