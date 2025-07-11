const db = require("..//config/knex");
const transactionService = require("..//services/transaction.service");
const checkOwnership = require("../utils/checkOwnership");

module.exports.getAll = async function (req, res) {
  try {
    const { page = 1, limit = 10, month, year, search = "" } = req.query;
    const company_id = req.user.company_id;

    // Lấy danh sách giao dịch (theo trang)
    const transactions = await transactionService.getFilteredTransactions({
      company_id,
      month,
      year,
      search,
      page: +page,
      limit: +limit,
    });

    // Lấy tổng số giao dịch (cho phân trang)
    const total = await transactionService.getTotalTransactions({
      company_id,
      month,
      year,
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
    console.log(result.company_id);
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
    let { company_id, user_id, category_id, type, date, amount, description } =
      req.body;
    if (!checkOwnership(company_id, req)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền tạo giao dịch cho công ty này" });
    }
    let result = await transactionService.createOne(
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
      message: "Create one transaction successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
module.exports.updateOne = async function (req, res) {
  try {
    const { id } = req.params;
    const oldTransaction = await transactionService.getOne(id);

    if (!oldTransaction)
      return res.status(404).json({ message: "Không tìm thấy giao dịch" });
    if (!checkOwnership(oldTransaction.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền sửa giao dịch này" });
    }

    const {
      company_id,
      user_id,
      category_id,
      type,
      date,
      amount,
      description,
    } = req.body;

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
    const transaction = await transactionService.getOne(id);

    if (!transaction)
      return res.status(404).json({ message: "Không tìm thấy giao dịch" });
    if (!checkOwnership(transaction.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xoá giao dịch này" });
    }

    await transactionService.deleteOne(id);

    res.json({ message: "Xoá giao dịch thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
