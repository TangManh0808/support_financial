const activityLogService = require("../../../services/dashboard/admin/activityLog.service");

module.exports.getAllLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, company_id, action, target_table } = req.query;

    const result = await activityLogService.getAllLogs({
      page: +page,
      limit: +limit,
      filters: { company_id, action, target_table },
    });

    res.json(result);
  } catch (error) {
    console.error("❌ Lỗi khi lấy activity logs:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
