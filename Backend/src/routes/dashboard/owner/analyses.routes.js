const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../../../middleware/auth.middleware");
const financialAnalysesController = require("../../../controllers/dashboard/owner/financialAnalyses.controller");

// Route lấy các chỉ số phân tích tài chính
router.get(
  "/analyses",
  authenticate,
  authorize(["owner"]),
  financialAnalysesController.getFinancialAnalyses
);

module.exports = router;
