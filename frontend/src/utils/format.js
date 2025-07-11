export const formatCurrency = (num) =>
  Number(num).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
