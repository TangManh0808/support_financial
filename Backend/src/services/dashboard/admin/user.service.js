const db = require("../../../config/knex");

/**
 * Lấy danh sách người dùng (phân trang + tìm kiếm)
 */
module.exports.getAllUsers = async ({ page = 1, limit = 10, search = "" }) => {
  const offset = (page - 1) * limit;

  try {
    const baseQuery = db("users")
      .leftJoin("companies", "users.company_id", "companies.id")
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.role",
        "users.status",
        "users.created_at",  
        "companies.name as company_name"
      );

    // Nếu có từ khóa tìm kiếm
    if (search) {
      baseQuery.where(function () {
        this.where("users.name", "like", `%${search}%`)
          .orWhere("users.email", "like", `%${search}%`)
          .orWhere("companies.name", "like", `%${search}%`);
      });
    }

    const countQuery = baseQuery.clone().clearSelect().count("* as total");

    const users = await baseQuery.limit(limit).offset(offset);
    const total = (await countQuery.first()).total;

    return {
      success: true,
      data: {
        users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
        },
      },
    };
  } catch (err) {
    console.error("❌ Lỗi getAllUsers:", err);
    return { success: false, message: err.message };
  }
};

/**
 * Khóa người dùng
 */
module.exports.lockUser = async (id) => {
  try {
    await db("users").where({ id }).update({ status: "locked" });
    return { success: true, message: "Đã khóa tài khoản thành công" };
  } catch (err) {
    console.error("❌ Lỗi lockUser:", err);
    return { success: false, message: err.message };
  }
};

/**
 * Mở khóa người dùng
 */
module.exports.unlockUser = async (id) => {
  try {
    await db("users").where({ id }).update({ status: "active" });
    return { success: true, message: "Đã mở khóa tài khoản thành công" };
  } catch (err) {
    console.error("❌ Lỗi unlockUser:", err);
    return { success: false, message: err.message };
  }
};

/**
 * Xóa người dùng
 */
module.exports.deleteUser = async (id) => {
  try {
    await db("users").where({ id }).del();
    return { success: true, message: "Đã xóa người dùng thành công" };
  } catch (err) {
    console.error("❌ Lỗi deleteUser:", err);
    return { success: false, message: err.message };
  }
};
