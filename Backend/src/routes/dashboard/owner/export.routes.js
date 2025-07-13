const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../../../middleware/auth.middleware");
const exportBalanceSheetController = require("../../../controllers/dashboard/exportBalanceSheet.controller");
const exportIncomeStatementController = require("../../../controllers/dashboard/exportIncomeStatement.controller");

// Cân đối kế toán
router.get(
  "/exports/balanceSheet",
  authenticate,
  authorize(["owner", "accountant"]),
  exportBalanceSheetController.exportBalanceSheet
);

// Kết quả kinh doanh
router.get(
  "/exports/incomeStatement",
  authenticate,
  authorize(["owner", "accountant"]),
 exportIncomeStatementController.exportIncomeStatement
);
module.exports = router;