const db = require("..//config/knex");
const userService = require("..//services/user.service");
const checkOwnership = require("../utils/checkOwnership");

module.exports.getAll = async function (req, res) {
  try {
    let result = await userService.getAll();
    if (req.user.role === "admin") {
      return res.json({ result: result });
    }
    if (req.user.role === "owner") {
      const filtered = users.filter(
        (u) => u.company_id === req.user.company_id
      );
      return res.json({ result: filtered });
    }
    // accountant → chỉ được thấy chính mình
    const self = users.find((u) => u.id === req.user.id);
    return res.json({ result: [self] });
  } catch (error) {
    res.json({
      error,
      message: "Error occured",
    });
  }
};
module.exports.getOne = async function (req, res) {
  try {
    let { id } = req.params;
    let result = await userService.getOne(id);
    if (!result)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    // ✅ Chỉ admin, owner hoặc chính mình được xem
    if (
      req.user.role !== "admin" &&
      req.user.role !== "owner" &&
      req.user.id !== result.id
    ) {
      return res
        .status(403)
        .json({ message: "Không có quyền xem người dùng này" });
    }
    // ✅ Kiểm tra công ty nếu không phải admin
    if (!checkOwnership(result.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền truy cập công ty khác" });
    }
    res.json({
      id: id,
      result,
      message: "Get one user successfully",
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
    let { company_id, name, email, password, role } = req.body;
    let result = await userService.createOne(
      company_id,
      name,
      email,
      password,
      role
    );
    res.json({
      result,
      message: "Create one user successfully",
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
    let { id } = req.params;
    let { company_id, name, email, password, role } = req.body;
    // console.log(company_id, name, email, password, role);

    const user = await userService.getOne(id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    // ✅ Chỉ admin, owner hoặc chính mình được sửa
    if (
      req.user.role !== "admin" &&
      req.user.role !== "owner" &&
      req.user.id !== user.id
    ) {
      return res.status(403).json({ message: "Không được sửa người khác" });
    }

    if (!checkOwnership(user.company_id, req)) {
      return res
        .status(403)
        .json({ message: "Không có quyền sửa người công ty khác" });
    }

    await userService.updateOne(id, company_id, name, email, password, role);
    res.json({
      message: "Update one user successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
module.exports.deleteOne = async function (req, res) {
  try {
    let { id } = req.params;
    let result = await userService.deleteOne(id);
    res.json({
      message: "Delete one user successfully",
    });
  } catch (error) {
    res.json({
      error,
      message: "Error",
    });
  }
};
