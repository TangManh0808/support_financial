import { useState, useEffect } from "react";
import axios from "axios";

export const useAccountantAnalyses = () => {
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInputs = async ({ month, year }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/financial_inputs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { month, year }
      });
      setInputs(res.data.result || []);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu financial_inputs:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveInput = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(`http://localhost:3000/financial_inputs`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const updateInput = async (id, data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(`http://localhost:3000/financial_inputs/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const deleteInput = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`http://localhost:3000/financial_inputs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  return {
    inputs,
    loading,
    fetchInputs,
    saveInput,
    updateInput,
    deleteInput,
  };
};
