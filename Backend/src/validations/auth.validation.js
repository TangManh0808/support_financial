// backend/src/validations/auth.validation.js
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Tên phải là chuỗi",
    "string.empty": "Tên không được để trống",
    "string.min": "Tên phải ít nhất {#limit} ký tự",
    "string.max": "Tên không được vượt quá {#limit} ký tự",
    "any.required": "Tên là bắt buộc",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải ít nhất {#limit} ký tự",
    "any.required": "Mật khẩu là bắt buộc",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),

  password: Joi.string().required().messages({
    "any.required": "Mật khẩu là bắt buộc",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
