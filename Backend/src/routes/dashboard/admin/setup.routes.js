const express = require("express");
const router = express.Router();
const setupController = require("../../../controllers/dashboard/admin/setup.controller");

router.post("/initialize", setupController.initializeAdmin);

module.exports = router;
