// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  // console.log(token);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // ⬅️ Tại đây gắn { id, role, company_id, ... } vào req.user
    // console.log(req.user);
    // console.log(token);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalid" });
  }
};

module.exports = { verifyToken };
