// src/services/auth.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/knex");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = "1d"; // Hoặc "7d"

module.exports.register = async ({ name, email, password }) => {
  const existingUser = await db("users").where({ email }).first();
  if (existingUser) {
    throw new Error("Email đã tồn tại");
  }
  const role = "owner";

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const [newUserId] = await db("users").insert({
    name,
    email,
    password: hashedPassword,
    role,
  });
  // Lấy lại thông tin để trả về đầy đủ
  const newUser = await db("users").where({ id: newUserId }).first();

  const token = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      company_id: newUser.company_id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  // console.log(existingUser);
  return {
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      company_id: newUser.company_id || null,
    },
  };
};

module.exports.login = async ({ email, password }) => {
  const user = await db("users").where({ email }).first();
  console.log("Tìm thấy user:", user);
  if (!user) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      company_id: user.company_id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company_id: user.company_id,
    },
  };
};
