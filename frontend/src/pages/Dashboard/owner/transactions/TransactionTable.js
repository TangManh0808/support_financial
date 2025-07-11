const TransactionTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2">Ngày</th>
            <th className="border px-4 py-2">Danh mục</th>
            <th className="border px-4 py-2">Mô tả</th>
            <th className="border px-4 py-2">Số tiền</th>
            <th className="border px-4 py-2">Loại</th>
            <th className="border px-4 py-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            data.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {new Date(tx.date).toLocaleDateString("vi-VN")}
                </td>
                <td className="border px-4 py-2">{tx.category_name || "-"}</td>
                <td className="border px-4 py-2">{tx.description}</td>
                <td className="border px-4 py-2 text-right">
                  {Number(tx.amount).toLocaleString("vi-VN")}₫
                </td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    tx.type === "revenue"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.type === "revenue" ? "Thu" : "Chi"}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    tx.status === "paid" ? "text-blue-600" : "text-orange-500"
                  }`}
                >
                  {tx.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
