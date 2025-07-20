const router = require("express").Router();
const { login, register, logout } = require("../controllers/authControllers");
const verifyAuth = require("../middlewares/verifyAuth");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", verifyAuth, logout);
router.get("/verify", verifyAuth);

module.exports = router;
