const router = require("express").Router();
const verifyAuth = require("../middlewares/verifyAuth");
const {
  sendMessage,
  getlist,
  getProfile,
  updateProfile,
  blockUser,
  searchUser,
} = require("../controllers/userControllers");

router.get("/search", searchUser);

module.exports = router;
