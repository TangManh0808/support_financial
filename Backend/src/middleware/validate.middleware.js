// backend/src/middleware/validate.middleware.js
module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    next();
  };
};
