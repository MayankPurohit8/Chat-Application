const jwt = require("jsonwebtoken");
const verifyAuth = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status().json({ message: "Invalid Access" });
    }
    const decoded = jwt.verify(token, "pass123");
    if (!decoded) {
      return res.status().json({ message: "Invalid Access" });
    }
    req.id = decoded.id;
  } catch (err) {}
};

module.exports = verifyAuth;
