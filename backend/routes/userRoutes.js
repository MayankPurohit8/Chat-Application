const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
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
  logout,
  editDp,
  deleteDp,
} = require("../controllers/userControllers");

router.get("/search", searchUser);
router.get("/getChats", getChats);
router.post("/send", verifyAuth, upload.single("image"), sendMessage);
router.get("/list", getlist);
router.get("/profile", verifyAuth, getProfile);
router.get("/getlastmessages", verifyAuth, getLastMessages);
router.get("/checkvalidusername", checkValidUsername);
router.put("/updateprofile", updateProfile);
router.post("/logout", logout);
router.post("/editDp", verifyAuth, upload.single("image"), editDp);
router.post("/deletedp", verifyAuth, deleteDp);
module.exports = router;
