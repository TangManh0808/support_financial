const express = require("express");
const router = express.Router();
const controller = require("../../../../controllers/dashboard/admin/adminCategory.controller");
const { authenticate } = require("../../../../middleware/auth.middleware");
const isAdmin = require("../../../../middleware/authIsAdmin.middleware");

router.use(authenticate, isAdmin); // ✅ bảo vệ route

router.get("/", controller.getAll);
router.delete("/:id", controller.delete);
router.put("/:id", controller.update);

module.exports = router;
