const express = require("express");
const router = express.Router();
const companyController = require("../../../controllers/dashboard/owner/settings/company.controller");
const userController = require("../../../controllers/dashboard/owner/settings/users.controller");
const configController = require("../../../controllers/dashboard/owner/settings/config.controller");
const changePasswordController = require("../../../controllers/dashboard/owner/settings/changePassword.controller");
const {
  authenticate,
  authorize,
} = require("../../../middleware/auth.middleware");

// ✅ GET company info
router.get(
  "/company",
  authenticate,
  authorize(["owner", "admin", "accountant"]),
  companyController.getCompanyInfo
);

// ✅ UPDATE company info
router.put(
  "/company/:id",
  authenticate,
  authorize(["owner", "admin"]),
  companyController.updateCompanyInfo
);

// 📌 GET tất cả người dùng thuộc công ty
router.get(
  "/users",
  authenticate,
  authorize(["owner", "admin"]),
  userController.getAllUsers
);

// 📌 Tạo người dùng mới
router.post(
  "/users",
  authenticate,
  authorize(["owner", "admin"]),
  userController.createUser
);

// 📌 Cập nhật người dùng
router.put(
  "/users/:id",
  authenticate,
  authorize(["owner", "admin"]),
  userController.updateUser
);

// 📌 Xoá người dùng
router.delete(
  "/users/:id",
  authenticate,
  authorize(["owner"]),
  userController.deleteUser
);

// 📌 Lấy cấu hình
router.get(
  "/config",
  authenticate,
  authorize(["owner", "admin"]),
  configController.getConfig
);

// 📌 Cập nhật / lưu cấu hình
router.post(
  "/config",
  authenticate,
  authorize(["owner", "admin"]),
  configController.saveConfig
);
// Thay mật khẩu
router.post(
  "/change-password",
  authenticate,
  changePasswordController.changePassword
);

module.exports = router;
