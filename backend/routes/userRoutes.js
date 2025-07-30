const router = require("express").Router();
const verifyAuth = require("../middlewares/verifyAuth");
const {
  sendMessage,
  getlist,
  getProfile,
  blockUser,
  searchUser,
  getChats,
  getLastMessages,
  checkValidUsername,
  updateProfile,
} = require("../controllers/userControllers");

router.get("/search", searchUser);
router.get("/getChats", getChats);
router.post("/send", sendMessage);
router.get("/list", getlist);
router.get("/profile", verifyAuth, getProfile);
router.get("/getlastmessages", verifyAuth, getLastMessages);
router.get("/checkvalidusername", checkValidUsername);
router.put("/updateprofile", updateProfile);
module.exports = router;
