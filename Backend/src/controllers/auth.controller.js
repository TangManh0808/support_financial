// src/controllers/auth.controller.js
const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json({ message: "Đăng nhập thành công", ...data });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
