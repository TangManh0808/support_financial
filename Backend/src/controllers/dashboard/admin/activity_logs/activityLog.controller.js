const activityLogService = require("../../../../services/dashboard/admin/activity_logs/activityLog.service");

exports.getLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const data = await activityLogService.getLogs({
      page: Number(page),
      limit: Number(limit),
      search: search.trim(),
    });

    res.json({ success: true, data });
  } catch (err) {
    console.error("Lỗi khi lấy activity logs:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
