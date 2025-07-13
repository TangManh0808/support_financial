import React from "react";
import { formatCurrency } from "~/utils/format";

const FinancialAnalysis = ({ data }) => {
  if (!data) return null;

  const {
    currentRatio,
    quickRatio,
    debtToEquity,
    grossProfitMargin,
    netProfitMargin,
    roe,
    roa,
  } = data;

  const formatPercent = (value) =>
    typeof value === "number" ? `${(value * 100).toFixed(1)}%` : "—";

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl border text-sm">
      <h2 className="text-xl font-bold text-purple-800 mb-4">
        📈 Phân Tích Tài Chính
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-base text-gray-700">
        <div className="flex justify-between border-b pb-1 font-medium">
          <span>Tỷ số thanh toán hiện hành</span>
          <span className="text-right">{currentRatio?.toFixed(2) || "—"}</span>
        </div>
        <div className="flex justify-between border-b pb-1 font-medium">
          <span>Tỷ số thanh toán nhanh</span>
          <span className="text-right">{quickRatio?.toFixed(2) || "—"}</span>
        </div>
        <div className="flex justify-between border-b pb-1 font-medium">
          <span>Hệ số nợ / vốn chủ sở hữu</span>
          <span className="text-right">{debtToEquity?.toFixed(2) || "—"}</span>
        </div>
        <div className="flex justify-between border-b pb-1 font-medium">
          <span>Biên lợi nhuận gộp</span>
          <span className="text-right">{formatPercent(grossProfitMargin)}</span>
        </div>
        <div className="flex justify-between border-b pb-1 font-medium">
          <span>Biên lợi nhuận ròng</span>
          <span className="text-right">{formatPercent(netProfitMargin)}</span>
        </div>
        <div className="flex justify-between border-b pb-1 font-medium">
          <span>ROE (Lợi nhuận trên vốn CSH)</span>
          <span className="text-right">{formatPercent(roe)}</span>
        </div>
        <div className="flex justify-between pb-1 font-medium">
          <span>ROA (Lợi nhuận trên tài sản)</span>
          <span className="text-right">{formatPercent(roa)}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;
