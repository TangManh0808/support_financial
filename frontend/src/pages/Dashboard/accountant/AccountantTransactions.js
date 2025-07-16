import { useState } from "react";
import { useAccountantTransactions } from "~/hooks/dashboard/accountant/transactions/useAccountantTransactions";
import { useCategories } from "~/hooks/dashboard/accountant/transactions/useCategories";
import CategoryManagerModal from "./CategoryManagerModal";

const AccountantTransactions = () => {
  const {
    transactions,
    loading,
    page,
    total,
    limit,
    setPage,
    filters,
    setFilters,
    addTransaction,
    deleteTransaction,
    updateTransaction, // ✅ thêm
  } = useAccountantTransactions();

  const { categories } = useCategories();
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    amount: "",
    type: "revenue",
    category_id: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const totalPages = Math.ceil(total / limit);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleSubmit = async () => {
    const { date, amount, description, type, category_id } = newTransaction;
    if (!date || !amount || !category_id)
      return alert("Vui lòng nhập đầy đủ thông tin");

    try {
      if (isEditing) {
        await updateTransaction(editingId, {
          ...newTransaction,
          amount: +amount,
        });
        alert("Cập nhật thành công");
      } else {
        await addTransaction({
          ...newTransaction,
          amount: +amount,
        });
        alert("Thêm giao dịch thành công");
      }

      // Reset form
      setNewTransaction({
        date: "",
        description: "",
        amount: "",
        type: "revenue",
        category_id: "",
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (err) {
      alert(isEditing ? "Lỗi khi cập nhật" : "Lỗi khi thêm giao dịch");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Giao dịch kế toán</h1>
        <button
          onClick={() => setShowCategoryModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Chỉnh sửa danh mục giao dịch Công ty
        </button>
      </div>

      {/* BỘ LỌC */}
      <div className="flex gap-4 flex-wrap items-center">
        <select
          name="month"
          value={filters.month}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Tháng --</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </option>
          ))}
        </select>

        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Năm --</option>
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Loại --</option>
          <option value="revenue">Thu</option>
          <option value="expense">Chi</option>
        </select>

        <input
          type="text"
          name="search"
          placeholder="Tìm mô tả..."
          value={filters.search}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      {/* FORM THÊM / SỬA */}
      <div className="grid grid-cols-6 gap-3">
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, date: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={newTransaction.description}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              description: e.target.value,
            })
          }
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          placeholder="Số tiền"
          value={newTransaction.amount}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, amount: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <select
          value={newTransaction.type}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              type: e.target.value,
              category_id: "",
            })
          }
          className="border px-2 py-1 rounded"
        >
          <option value="revenue">Thu</option>
          <option value="expense">Chi</option>
        </select>
        <select
          value={newTransaction.category_id}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              category_id: e.target.value,
            })
          }
          className="border px-2 py-1 rounded"
        >
          <option value="">-- Chọn danh mục --</option>
          {categories
            .filter((c) => c.type === newTransaction.type)
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        <button
          onClick={handleSubmit}
          className={`${
            isEditing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-1 rounded`}
        >
          {isEditing ? "Lưu" : "Thêm"}
        </button>
      </div>

      {/* BẢNG GIAO DỊCH */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : transactions.length === 0 ? (
        <p>Không có giao dịch nào</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-2 py-1">Ngày</th>
              <th className="border px-2 py-1">Mô tả</th>
              <th className="border px-2 py-1">Số tiền</th>
              <th className="border px-2 py-1">Loại</th>
              <th className="border px-2 py-1">Danh mục</th>
              <th className="border px-2 py-1">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="border px-2 py-1">{t.date.slice(0, 10)}</td>
                <td className="border px-2 py-1">{t.description}</td>
                <td className="border px-2 py-1">
                  {parseInt(t.amount).toLocaleString()} ₫
                </td>
                <td className="border px-2 py-1 capitalize">{t.type}</td>
                <td className="border px-2 py-1">{t.category_name}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditingId(t.id);
                      setNewTransaction({
                        date: t.date.slice(0, 10),
                        description: t.description,
                        amount: t.amount,
                        type: t.type,
                        category_id: t.category_id,
                      });
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PHÂN TRANG */}
      <div className="flex justify-between mt-4 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ← Trang trước
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trang sau →
        </button>
      </div>

      {/* MODAL QUẢN LÝ DANH MỤC */}
      <CategoryManagerModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        refresh={() => window.location.reload()}
      />
    </div>
  );
};

export default AccountantTransactions;
