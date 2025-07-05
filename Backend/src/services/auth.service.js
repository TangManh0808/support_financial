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

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const [newUserId] = await db("users").insert({
    name,
    email,
    password: hashedPassword,
  });
  // console.log(existingUser);
  return { id: newUserId, name, email };
};

module.exports.login = async ({ email, password }) => {
  const user = await db("users").where({ email }).first();
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
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};
