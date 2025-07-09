// src/api/dashboard/owner.js
import axios from "axios";

export const getFinancialOverview = async ({ month, year }) => {
  const token = localStorage.getItem("token");

  // console.log(token);

  const res = await axios.get("/dashboard/owner/financial", {
    params: { month, year },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
