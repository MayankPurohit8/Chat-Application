const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const io = require("../server");
const sendMessage = async (req, res) => {
  try {
    const created_by = req.body.user;
    const created_to = req.body.to;
    const chat = req.body.message;
    const user = await User.findById(created_by);
    const to = await User.findById(created_to);
    const newChat = await Chat.create({
      created_by,
      created_to,
      chat,
    });
    if (!user.dm_list.includes(created_to)) {
      user.dm_list.push(created_to);
      await user.save();
    }
    if (!to.dm_list.includes(created_by)) {
      to.dm_list.push(created_by);
      await to.save();
    }
    return res.status(200).json({ message: "sent", chat: newChat });
  } catch (err) {}
};

const getlist = async (req, res) => {
  try {
    const { user } = req.query;

    const currUser = await User.findById(user).populate("dm_list", "name");
    list = currUser.dm_list;

    return res.status(200).json({ list: list });
  } catch (err) {}
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id);
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

const getChats = async (req, res) => {
  try {
    const { user, to } = req.query;
    const chats = await Chat.find({
      $or: [
        { created_by: user, created_to: to },
        { created_by: to, created_to: user },
      ],
    }).sort({ created_at: 1 });

    return res.status(200).json({ chats: chats });
  } catch (err) {}
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
  getChats,
};
