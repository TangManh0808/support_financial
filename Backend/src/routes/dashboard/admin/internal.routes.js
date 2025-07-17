const express = require("express");
const router = express.Router();
const internalController = require("../../../controllers/dashboard/admin/internal.controller");

// Tạo thêm admin qua môi trường nội bộ (dev/test only)
router.post("/create-super-admin", internalController.createSuperAdmin);

module.exports = router;
