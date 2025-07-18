const express = require("express");
const router = express.Router();
const overviewController = require("../../../controllers/dashboard/admin/overview.controller");
const { authenticate } = require("../../../middleware/auth.middleware");
const  authIsAdmin  = require("../../../middleware/authIsAdmin.middleware");

router.get("/", authenticate, authIsAdmin, overviewController.getOverview);

module.exports = router;
