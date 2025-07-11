// pages/Reports/useReports.js
import { useEffect, useState } from "react";
import axios from "~/lib/axios";

const useReports = ({ month, year }) => {
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [incomeStatement, setIncomeStatement] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [balanceRes, incomeRes] = await Promise.all([
          axios.get(`/reports/balance-sheet?month=${month}&year=${year}`),
          axios.get(`/reports/income-statement?month=${month}&year=${year}`),
        ]);
        // console.log(balanceRes.data.data);
        setBalanceSheet(balanceRes.data);
        setIncomeStatement(incomeRes.data.data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu báo cáo:", error);
      }
    };

    fetchReports();
  }, [month, year]);

  return { balanceSheet, incomeStatement };
};

export default useReports;
