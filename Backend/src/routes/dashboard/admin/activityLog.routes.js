const express = require("express");
const router = express.Router();
const activityLogController = require("../../../controllers/dashboard/admin/activityLog.controller");
const {
  authenticate,
} = require("../../../middleware/auth.middleware");
const authIsAdmin = require("../../../middleware/authIsAdmin.middleware");
console.log("typeof authIsAdmin:", typeof authIsAdmin);
router.get(
  "/",
  authenticate,
  authIsAdmin,
  activityLogController.getAllLogs
);

module.exports = router;
