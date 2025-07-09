import React from "react";
import FinancialOverview from "~/pages/Dashboard/owner/sections/FinancialOverview";
import { Card, CardHeader } from "~/components/ui/card";

const OwnerDashboard = () => {
  return (
    <div className="ml-100 space-y-6 p-4 min-h-screen bg-gray-50">
      <div className="grid grid-cols-6 gap-4 mb-4">
        <FinancialOverview />
        <Card className="col-span-1">Nợ phải thu</Card>
        <Card className="col-span-1">Nợ phải trả</Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
