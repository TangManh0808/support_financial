const express = require("express");
const router = express.Router();
const adminUserController = require("../../../../controllers/dashboard/admin/user.controller");
const { authenticate } = require("../../../../middleware/auth.middleware");
const authIsAdmin = require("../../../../middleware/authIsAdmin.middleware");

// Áp dụng middleware xác thực và kiểm tra admin
// router.use(authMiddleware, authIsAdmin);

// GET danh sách user có tìm kiếm và phân trang
router.get("/", authenticate, authIsAdmin, adminUserController.getAllUsers);

// PATCH khóa/mở khóa tài khoản
router.patch(
  "/:id/status",
  authenticate,
  authIsAdmin,
  adminUserController.toggleUserStatus
);

// DELETE xoá tài khoản
router.delete(
  "/:id",
  authenticate,
  authIsAdmin,
  adminUserController.deleteUser
);

module.exports = router;
