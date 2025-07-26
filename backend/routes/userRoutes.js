const router = require("express").Router();
const verifyAuth = require("../middlewares/verifyAuth");
const {
  sendMessage,
  getlist,
  getProfile,
  updateProfile,
  blockUser,
  searchUser,
  getChats,
} = require("../controllers/userControllers");

router.get("/search", searchUser);
router.get("/getChats", getChats);
router.post("/send", sendMessage);
router.get("/list", getlist);
router.get("/profile", verifyAuth, getProfile);
module.exports = router;
