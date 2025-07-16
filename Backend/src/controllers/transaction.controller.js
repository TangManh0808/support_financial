const db = require("..//config/knex");
const transactionService = require("..//services/transaction.service");
const checkOwnership = require("../utils/checkOwnership");

module.exports.getAll = async function (req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      month,
      year,
      search = "",
      type = "",
    } = req.query;
    const company_id = req.user.company_id;

    const transactions = await transactionService.getFilteredTransactions({
      company_id,
      month,
      year,
      type,
      search,
      page: +page,
      limit: +limit,
    });

    const total = await transactionService.getTotalTransactions({
      company_id,
      month,
      year,
      type,
      search,
    });

    res.json({
      data: transactions,
      total,
      page: +page,
      limit: +limit,
      message: "Lấy danh sách giao dịch thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};
module.exports.getOne = async function (req, res) {
  try {
    let { id } = req.params;
    let result = await transactionService.getOne(id);
    // console.log(result.company_id);

    if (!result)
      return res.status(404).json({ message: "Không tìm thấy giao dịch" });
    if (!checkOwnership(result.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền truy cập giao dịch này" });
    }
    res.json({
      id: id,
      result,
      message: "Get one transaction successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
module.exports.createOne = async function (req, res) {
  try {
    const { category_id, type, date, amount, description } = req.body;

    // Lấy từ req.user
    const company_id = req.user.company_id;
    const user_id = req.user.id;
    console.log(company_id);

    const result = await transactionService.createOne(
      company_id,
      user_id,
      category_id,
      type,
      date,
      amount,
      description
    );

    res.json({
      result,
      message: "Tạo giao dịch thành công",
    });
  } catch (error) {
    console.error("❌ Lỗi khi tạo giao dịch:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

module.exports.updateOne = async function (req, res) {
  try {
    const { id } = req.params;
    // console.log(id);
    const oldTransaction = await transactionService.getOne(id);

    if (!oldTransaction)
      return res.status(404).json({ message: "Không tìm thấy giao dịch" });
    if (!checkOwnership(oldTransaction.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền sửa giao dịch này" });
    }

    // chỉ cho phép sửa các trường cho phép
    const { category_id, type, date, amount, description } = req.body;
    const company_id = req.user.company_id;
    const user_id = req.user.id;

    await transactionService.updateOne(
      id,
      company_id,
      user_id,
      category_id,
      type,
      date,
      amount,
      description
    );

    res.json({ message: "Cập nhật giao dịch thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports.deleteOne = async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    // 1. Lấy giao dịch từ DB
    const transaction = await transactionService.getOne(id);
    console.log(transaction);

    if (!transaction) {
      return res.status(404).json({ message: "Không tìm thấy giao dịch" });
    }

    // 2. Kiểm tra quyền xoá
    const ownerCompany = transaction.company_id;
    const currentUserCompany = req.user.company_id;
    const currentUserId = req.user.id;

    if (!checkOwnership(ownerCompany, req)) {
      console.warn(
        `❌ Người dùng [id=${currentUserId}] cố gắng xoá giao dịch không thuộc công ty của họ (transaction.company_id=${ownerCompany}, req.user.company_id=${currentUserCompany})`
      );
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xoá giao dịch này" });
    }

    // 3. Tiến hành xoá
    await transactionService.deleteOne(id);

    res.json({ message: "Xoá giao dịch thành công" });
  } catch (error) {
    console.error("❌ Lỗi server khi xoá giao dịch:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
