import { useEffect, useState } from "react";
import axios from "axios";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/transaction_categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res.data.result); // ✅ sửa tại đây
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { categories, loadingCategories };
};
