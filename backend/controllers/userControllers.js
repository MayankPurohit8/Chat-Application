const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const sendMessage = async (req, res) => {
  try {
    const created_by = req.id;
    const created_to = req.body;
    const chat = req.body;
    const user = User.findbyId(created_by);
    const newChat = await Chat.create({
      created_by,
      created_to,
      chat,
    });

    if (!user.dm_list.includes(created_to)) {
      await user.dm_list.push(created_to);
    }
    return res.status(200).json({ messgae: "sent" });
  } catch (err) {}
};

const getlist = async (req, res) => {
  try {
    const receivers = await User.findbyId(req.id).dm_list;
    return res.send(200).json({ list: receivers });
  } catch (err) {}
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findbyId(req.id);
    return res
      .status(200)
      .json({ name: user.name, email: user.email, bio: user.bio });
  } catch (err) {}
};

const searchUser = async (req, res) => {
  try {
    const { user, name } = req.query;

    const users = await User.find({ name: { $regex: `^${name}` } }).select(
      "-password -__v"
    );
    const curruser = await User.findById(user);
    const resUser = users.filter(
      (user) => !curruser.dm_list.includes(user._id) && user != curruser._id
    );

    return res.status(200).json({ users: resUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "somethin went wrong while searching" });
  }
};
const updateProfile = async (req, res) => {};

const blockUser = async (req, res) => {};

const unblockUser = async (req, res) => {};

module.exports = {
  sendMessage,
  getlist,
  getProfile,
  updateProfile,
  blockUser,
  searchUser,
};
