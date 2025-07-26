const jwt = require("jsonwebtoken");
const verifyAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Invalid Access" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid Access" });
    }
    req.id = decoded.id;
    next();
  } catch (err) {}
};

module.exports = verifyAuth;
