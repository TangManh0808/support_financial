const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
const { authenticate } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware"); // Multer

// Tải file thường
router.post(
  "/",
  authenticate,
  upload.single("file"),
  fileController.uploadFile
);

// Lấy danh sách file
router.get("/", authenticate, fileController.getAllFiles);

// Lấy chi tiết 1 file
router.get("/:id", authenticate, fileController.getFileById);

// Xoá file
router.delete("/:id", authenticate, fileController.deleteFile);

// Upload logo
router.post(
  "/logo",
  authenticate,
  upload.single("file"),
  fileController.uploadCompanyLogo
);

// Lấy logo hiện tại
router.get("/logo", authenticate, fileController.getCompanyLogo);
module.exports = router;
