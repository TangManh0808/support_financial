const express = require("express");
const router = express.Router();
const reportsController = require("..//controllers//report.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const balanceSheet = require("../controllers/dashboard/owner/balanceSheet.controller");
const incomeStatement = require("../controllers/dashboard/owner/incomeStatement.controller");

// 📊 Bảng cân đối kế toán
router.get(
  "/balance-sheet",
  authenticate,
  authorize(["owner", "accountant"]),
  balanceSheet.getBalanceSheet
);

// 📈 Báo cáo kết quả kinh doanh
router.get(
  "/income-statement",
  authenticate,
  authorize(["owner", "accountant"]),
  incomeStatement.getIncomeStatement
);

router.post(
  "/",
  authenticate,
  authorize(["accountant"]),
  reportsController.createOne
);

router.put(
  "/:id",
  authenticate,
  authorize(["accountant"]),
  reportsController.updateOne
);

router.delete(
  "/:id",
  authenticate,
  authorize(["accountant"]),
  reportsController.deleteOne
);

module.exports = router;
