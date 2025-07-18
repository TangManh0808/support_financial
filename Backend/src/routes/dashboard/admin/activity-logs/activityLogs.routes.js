const express = require("express");
const router = express.Router();
const activityLogController = require("../../../../controllers/dashboard/admin/activity_logs/activityLog.controller");
const { authenticate } = require("../../../../middleware/auth.middleware");
const authIsAdmin = require("../../../../middleware/authIsAdmin.middleware");

router.get("/", authenticate, authIsAdmin, activityLogController.getLogs);

module.exports = router;
