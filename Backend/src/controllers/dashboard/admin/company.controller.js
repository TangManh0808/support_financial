const companyService = require("../../../services/dashboard/admin/company.service");

exports.getAllCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await companyService.getAllCompanies({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Lỗi lấy danh sách công ty:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
