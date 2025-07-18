// knexfile.js
// Là file cấu hình mặc định để CLI của Knex biết kết nối DB như thế nào
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
};
