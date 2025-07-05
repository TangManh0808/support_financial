const express = require("express");
const router = express.Router();
const userController = require("..//controllers//user.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");
// Chỉ admin mới được xem toàn bộ user
router.get("/", authenticate, authorize(["admin"]), userController.getAll);
// Admin hoặc chính người dùng mới được xem
router.get("/:id", authenticate, authorize(["admin", "owner", "accountant"]), userController.getOne);
// Admin mới tạo user
router.post("/", authenticate, authorize(["admin"]), userController.createOne);
// Admin hoặc chính người dùng sửa thông tin
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  userController.updateOne
);
// Admin xóa
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteOne
);

module.exports = router;
