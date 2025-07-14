import Chat from "../models/chatModel";
import User from "../models/userModel";
const sendMessage = async (req, res) => {
  try {
    const created_by = req.id;
    const created_to = req.to;
    const chat = req.message;
    const user = User.findbyId(created_by);
    const newChat = await Chat.create({
      created_by,
      created_to,
      chat,
    });

    if (!user.dm_list.includes(created_to)) {
      user.dm_list.push(created_to);
    }
    return res.status(200);
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

const updateProfile = async (req, res) => {};

const blockUser = async (req, res) => {};

const unblockUser = async (req, res) => {};

modules.export = { sendMessage, getlist, getProfile, updateProfile, blockUser };
