const jwt = require("jsonwebtoken");

module.exports.authenticate = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    try {
      let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded; // gán thông tin người dùng vào req.user
      // đây là một token hợp lệ tức là người dùng đã đăng nhập thành công
      console.log(decoded);
      next();
    } catch (error) {
      res.json(error);
    }
  }
};
module.exports.authorize = function (roles) {
  return function (req, res, next) {
    console.log(req.user);
    console.log(roles);
    if (roles.includes(req.user.roles_user)) {
      next();
    } else {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
  };
};
