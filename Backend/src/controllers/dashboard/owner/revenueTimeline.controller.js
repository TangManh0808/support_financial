// controllers/revenueTimeline.controller.js
const revenueTimelineService = require("../../../services/dashboard/revenueTimeline.service");

exports.getTimeline = async (req, res) => {
  try {
    const { type, year, from, to } = req.query;
    const company_id = req.user.company_id;

    const data = await revenueTimelineService.getTimelineData({
      type,
      year,
      from,
      to,
      company_id,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Lỗi lấy dữ liệu timeline:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
