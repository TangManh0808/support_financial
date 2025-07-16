const { token } = require("morgan");
const companyService = require("../../../../services/dashboard/settings/company.service");

exports.getCompanyInfo = async (req, res) => {
  try {
    const company_id = req.user.company_id;
    console.log("Thông tin user từ token:", req.user, token);

    const company = await companyService.getById(company_id);
    console.log(company_id);
    res.json(company);
  } catch (error) {
    console.error("Lỗi lấy thông tin công ty:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.updateCompanyInfo = async (req, res) => {
  try {
    const company_id = req.user.company_id;
    // console.log(req.user);
    const updateData = req.body;

    await companyService.updateById(company_id, updateData);
    res.json({ message: "Cập nhật thông tin công ty thành công" });
  } catch (error) {
    console.error("Lỗi cập nhật công ty:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
