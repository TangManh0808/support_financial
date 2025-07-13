const path = require("path");
const {
  exportService,
} = require("../../services/dashboard/exportBalanceSheet.service");

exports.exportBalanceSheet = async (req, res) => {
  try {
    const company_id = req.user?.company_id;
    const { month, year } = req.query;

    if (!company_id || !month || !year) {
      return res.status(400).json({
        message: "Thiếu tham số company_id, month hoặc year",
      });
    }

    const result = await exportService({ company_id, month, year });

    // ✅ Trả file về client để tải về
    const filePath = result.filePath;
    const fileName = path.basename(filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("❌ Lỗi khi gửi file:", err);
        return res
          .status(500)
          .json({ message: "Lỗi gửi file", error: err.message });
      }
    });
  } catch (error) {
    console.error("❌ Lỗi export Excel:", error);
    res.status(500).json({
      message: "Lỗi server khi xuất báo cáo",
      error: error.message,
    });
  }
};
