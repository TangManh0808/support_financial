const receivableService = require("../../../services/dashboard/receivable.service");

exports.getStatus = async (req, res) => {
  try {
    const company_id = req.user.company_id;

    const data = await receivableService.getStatus(company_id);

    res.status(200).json(data);
  } catch (error) {
    console.error("Lỗi khi lấy công nợ phải thu:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
