const db = require("../../../config/knex");


// 📌 Lấy toàn bộ cấu hình dạng object
exports.getByCompany = async (company_id) => {
  const rows = await db("configurations").where({ company_id });

  const config = {};
  rows.forEach((row) => {
    config[row.key_name] = parseValue(row.value);
  });

  return config;
};

// 📌 Lưu hoặc cập nhật nhiều key cấu hình
exports.saveOrUpdate = async (company_id, configObj) => {
  const existingRows = await db("configurations").where({ company_id });
  const existingKeys = new Set(existingRows.map((row) => row.key_name));

  const updates = [];

  for (const key in configObj) {
    const value = String(configObj[key]);

    if (existingKeys.has(key)) {
      updates.push(
        db("configurations")
          .where({ company_id, key_name: key })
          .update({ value })
      );
    } else {
      updates.push(
        db("configurations").insert({ company_id, key_name: key, value })
      );
    }
  }

  await Promise.all(updates);
};

// 📌 Hàm hỗ trợ chuyển value từ TEXT về đúng kiểu
function parseValue(value) {
  try {
    return JSON.parse(value); // Nếu là số, boolean, object stringified
  } catch {
    return value; // Nếu là chuỗi thông thường
  }
}
