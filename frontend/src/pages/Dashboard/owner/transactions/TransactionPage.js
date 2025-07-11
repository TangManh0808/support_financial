// src/pages/Transactions/TransactionPage.jsx
import { useState } from "react";
import TransactionTable from "./TransactionTable";
import useTransactions from "~/hooks/dashboard/owner/transactions/useTransactions";

const TransactionPage = () => {
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, total, loading, error } = useTransactions({
    month,
    year,
    search,
    page,
    limit,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Danh sách giao dịch</h2>

      {/* Bộ lọc */}
      <div className="flex gap-4 items-center mb-4 flex-wrap">
        <div>
          <label className="text-sm">Tháng:</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="ml-2 text-sm border border-gray-300 rounded px-2 py-1"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Năm:</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="ml-2 text-sm border border-gray-300 rounded px-2 py-1"
          >
            {[year, year - 1, year - 2].map((y) => (
              <option key={y} value={y}>
                Năm {y}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Tìm mô tả..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-60"
        />
      </div>

      {/* Bảng */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-red-500">Lỗi khi tải dữ liệu</p>
      ) : (
        <>
          <TransactionTable data={data} />
          {/* Phân trang */}
          <div className="mt-4 flex justify-between items-center text-sm">
            <p>
              Trang {page} / {totalPages}
            </p>
            <div className="space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Trước
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionPage;
