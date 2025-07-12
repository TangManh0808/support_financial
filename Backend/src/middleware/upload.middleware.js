const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 🔧 Đảm bảo thư mục upload tồn tại
const uploadDir = path.join(__dirname, "..", "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Đưa đường dẫn tuyệt đối
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Lấy đuôi file gốc
    cb(null, uniqueSuffix + ext); // Tên file mới: ví dụ 1752320756360-943037574.pdf
  },
});

module.exports = multer({ storage });
