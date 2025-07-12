const configService = require("../../../../services//dashboard/settings/config.service");

exports.getConfig = async (req, res) => {
  try {
    const company_id = req.user.company_id;
    const config = await configService.getByCompany(company_id);
    res.json(config || {});
  } catch (error) {
    console.error("Lỗi lấy cấu hình:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.saveConfig = async (req, res) => {
  try {
    const company_id = req.user.company_id;
    const data = req.body; // ví dụ: { currency: "VND", decimalDigits: 2 }

    await configService.saveOrUpdate(company_id, data);

    res.json({ message: "Lưu cấu hình thành công" });
  } catch (error) {
    console.error("Lỗi lưu cấu hình:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

