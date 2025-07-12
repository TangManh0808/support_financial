const db = require("../config/knex");
const fs = require("fs");
const path = require("path");

/**
 * 📁 Lưu file vào DB (và lưu đường dẫn tệp)
 */
exports.saveFile = async ({ company_id, user_id, file, file_type }) => {
  const fileData = {
    company_id,
    user_id,
    file_name: file.originalname,
    file_url: `/uploads/${file.filename}`,
    file_type: file_type || "other",
  };
  //   console.log(fileData);

  const [id] = await db("files").insert(fileData);
  return { id, ...fileData };
};

/**
 * 📄 Lấy tất cả file của một công ty
 */
exports.getFilesByCompany = async (company_id) => {
  return await db("files").where({ company_id }).orderBy("uploaded_at", "desc");
};

/**
 * 🔍 Lấy 1 file theo ID
 */
exports.getFileById = async (id) => {
  return await db("files").where({ id }).first();
};

/**
 * 🖼 Lấy logo công ty
 */
exports.getLogo = async (company_id) => {
  return await db("files")
    .where({ company_id, file_type: "logo" })
    .orderBy("uploaded_at", "desc")
    .first();
};

/**
 * 🧹 Xoá logo cũ (khi upload logo mới)
 */
exports.deleteLogo = async (company_id) => {
  const logos = await db("files").where({ company_id, file_type: "logo" });

  for (const logo of logos) {
    // Xoá file khỏi ổ cứng
    try {
      const filePath = path.join(__dirname, "..", "public", logo.file_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error("Lỗi xoá file khỏi ổ cứng:", err.message);
    }
  }

  // Xoá record trong DB
  await db("files").where({ company_id, file_type: "logo" }).del();
};

/**
 * 🗑 Xoá file (kiểm tra quyền công ty)
 */
exports.deleteFile = async (id, company_id) => {
  const file = await db("files").where({ id }).first();
  if (!file || file.company_id !== company_id) {
    throw new Error("Không có quyền hoặc không tồn tại");
  }

  // Xoá file vật lý nếu có
  try {
    const filePath = path.join(__dirname, "..", "public", file.file_url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("Lỗi khi xoá file vật lý:", err.message);
  }

  // Xoá record
  await db("files").where({ id }).del();
  return true;
};
