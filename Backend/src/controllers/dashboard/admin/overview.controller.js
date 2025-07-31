const overviewService = require("../../../services/dashboard/admin/overview.service");

exports.getOverview = async (req, res) => {
  try {
    const year = parseInt(req.query.year);
    const data = await overviewService.getOverview(year);
    res.json({ success: true, data });
  } catch (error) {
    console.error("❌ Lỗi khi lấy tổng quan admin:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
