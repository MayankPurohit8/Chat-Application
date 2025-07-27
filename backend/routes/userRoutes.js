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
  getLastMessages,
} = require("../controllers/userControllers");

router.get("/search", searchUser);
router.get("/getChats", getChats);
router.post("/send", sendMessage);
router.get("/list", getlist);
router.get("/profile", verifyAuth, getProfile);
router.get("/getlastmessages", verifyAuth, getLastMessages);
module.exports = router;
