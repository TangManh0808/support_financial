import { useState, useEffect } from "react";
import axios from "axios";

const CategoryManagerModal = ({ isOpen, onClose, refresh }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", type: "revenue" });
  const [editCategory, setEditCategory] = useState(null); // lưu danh mục đang sửa

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    if (isOpen) fetchCategories();
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/transaction_categories", {
        headers: getAuthHeader(),
      });
      setCategories(res.data.result || []);
    } catch (err) {
      console.error("Lỗi lấy danh mục:", err);
    }
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));

      const dataToSend = {
        ...newCategory,
        company_id: payload.company_id,
      };

      await axios.post("http://localhost:3000/transaction_categories", dataToSend, {
        headers: getAuthHeader(),
      });

      setNewCategory({ name: "", type: "revenue" });
      alert("Bạn đã thêm danh mục thành công");
      fetchCategories();
      refresh();
    } catch (err) {
      console.error("Lỗi khi thêm danh mục:", err);
      alert("Lỗi khi thêm danh mục");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xoá danh mục?")) return;
    try {
      await axios.delete(`http://localhost:3000/transaction_categories/${id}`, {
        headers: getAuthHeader(),
      });
      alert("Bạn đã xóa danh mục thành công");
      fetchCategories();
      refresh();
    } catch (err) {
      console.error("Lỗi khi xoá danh mục:", err);
      alert("Không xoá được danh mục này");
    }
  };

  const handleEdit = (category) => {
    setEditCategory({ ...category }); // bắt đầu sửa
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3000/transaction_categories/${editCategory.id}`,
        editCategory,
        {
          headers: getAuthHeader(),
        }
      );
      alert("Cập nhật danh mục thành công");
      setEditCategory(null);
      fetchCategories();
      refresh();
    } catch (err) {
      console.error("Lỗi khi cập nhật danh mục:", err);
      alert("Không thể cập nhật danh mục");
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Danh mục giao dịch công ty</h2>

        {/* Form Thêm */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <input
            type="text"
            placeholder="Tên danh mục"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="border px-2 py-1 rounded col-span-2"
          />
          <select
            value={newCategory.type}
            onChange={(e) =>
              setNewCategory({ ...newCategory, type: e.target.value })
            }
            className="border px-2 py-1 rounded"
          >
            <option value="revenue">Thu</option>
            <option value="expense">Chi</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white rounded px-3 py-1 hover:bg-green-700"
          >
            Thêm
          </button>
        </div>

        {/* Bảng Danh mục */}
        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Tên</th>
              <th className="border px-2 py-1">Loại</th>
              <th className="border px-2 py-1">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td className="border px-2 py-1">
                  {editCategory?.id === c.id ? (
                    <input
                      value={editCategory.name}
                      onChange={(e) =>
                        setEditCategory({ ...editCategory, name: e.target.value })
                      }
                      className="border px-1 py-0.5 w-full rounded"
                    />
                  ) : (
                    c.name
                  )}
                </td>
                <td className="border px-2 py-1 capitalize">
                  {editCategory?.id === c.id ? (
                    <select
                      value={editCategory.type}
                      onChange={(e) =>
                        setEditCategory({ ...editCategory, type: e.target.value })
                      }
                      className="border px-1 py-0.5 rounded"
                    >
                      <option value="revenue">Thu</option>
                      <option value="expense">Chi</option>
                    </select>
                  ) : (
                    c.type
                  )}
                </td>
                <td className="border px-2 py-1 space-x-1">
                  {editCategory?.id === c.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={() => setEditCategory(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                      >
                        Huỷ
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Xoá
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Nút đóng */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CategoryManagerModal;
