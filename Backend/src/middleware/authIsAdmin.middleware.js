// middlewares/authIsAdmin.middleware.js

module.exports = function authIsAdmin(req, res, next) {
  console.log("✅ Vào authIsAdmin");
  console.log("req.user:", req.user);
  if (!req.user || req.user.role !== "admin") {
    console.log("✅ Vào authIsAdmin");


    return res.status(403).json({
      message: "Chỉ admin được phép truy cập tài nguyên này",
    });
  }
  next();
};
