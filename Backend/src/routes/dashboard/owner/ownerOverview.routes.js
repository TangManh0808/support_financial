const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../../middleware/verifyToken.middleware");


const financial = require("../../../controllers/dashboard/owner/financialOverview.controller");
const receivable = require("../../../controllers/dashboard/owner/receivable.controller");
const payable = require("../../../controllers/dashboard/owner/payable.controller");
const revenueExpense = require("../../../controllers/dashboard/owner/revenueExpense.controller");
const netProfit = require("../../../controllers/dashboard/owner/netProfit.controller");
const revenueTimeline = require("../../../controllers/dashboard/owner/revenueTimeline.controller");
// const bestSelling = require("../../../controllers/dashboard/owner/bestSelling.controller");
const cashflow = require("../../../controllers/dashboard/owner/cashflow.controller");
const expenseDetail = require("../../../controllers/dashboard/owner/expenseDetail.controller");

// Route chức chính gọi các biểu đồ trong Dashboard 
router.get("/financial", verifyToken, financial.getOverview);
router.get("/receivable", verifyToken, receivable.getStatus);
router.get("/payable", verifyToken, payable.getStatus);
router.get("/revenue-expense", verifyToken, revenueExpense.getChartData);
router.get("/net-profit", verifyToken, netProfit.getChartData);
router.get("/revenue-timeline", verifyToken, revenueTimeline.getTimeline);
// router.get("/best-selling", verifyToken, bestSelling.getTopItems);
router.get("/cashflow", verifyToken, cashflow.getChartData);
router.get("/expense-detail", verifyToken, expenseDetail.getBreakdown);
// Route chức năng Báo Cáo 

module.exports = router;
