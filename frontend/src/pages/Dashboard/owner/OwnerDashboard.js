import React from "react";
import FinancialOverview from "~/pages/Dashboard/owner/sections/FinancialOverview";
import { Card, CardHeader } from "~/components/ui/card";
import RevenueExpense from "~/pages/Dashboard/owner/sections/RevenueExpense";
import NetProfit from "~/pages/Dashboard/owner/sections/NetProfit";
import RevenueTimeline from "~/pages/Dashboard/owner/sections/RevenueTimeline";
import TopSellingProducts from "~/pages/Dashboard/owner/sections/TopSellingProducts";
import CashFlowChart from "~/pages/Dashboard/owner/sections/Cashflow";
import ExpenseChart from "~/pages/Dashboard/owner/sections/ExpenseDetail";
import PayableChart from "~/pages/Dashboard/owner/sections/Payable";
import ReceivableByDueChart from "~/pages/Dashboard/owner/sections/ReceivableByDueChart";

const OwnerDashboard = () => {
  return (
    <div className="ml-100 space-y-6 p-4 min-h-screen bg-gray-100">
      <div className="grid grid-cols-6 gap-4 mb-4">
        <FinancialOverview  className="col-span-1"/>
        <ReceivableByDueChart className="col-span-1" />  
        <PayableChart className="col-span-1" />
        {/* <Card className="col-span-1">Nợ phải trả</Card> */}
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Hàng 2 */}
        <RevenueExpense />
        <NetProfit />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Hàng 3 */}
        <RevenueTimeline />
        <TopSellingProducts />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <CashFlowChart />
        <ExpenseChart />
      </div>
    </div>
  );
};

export default OwnerDashboard;
