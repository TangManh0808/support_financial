// const reportService = require("../../../services/dashboard/balanceSheet.service");

const balanceSheetService = require("../../../services/dashboard/balanceSheet.service");

exports.getBalanceSheet = async (req, res) => {
  try {
    const { month, year } = req.query;
    const company_id = req.user.company_id;

    const data = await balanceSheetService.getBalanceSheet({ company_id, month, year });
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy bảng cân đối kế toán:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
