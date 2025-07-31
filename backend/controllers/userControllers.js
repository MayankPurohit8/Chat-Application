const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const io = require("../server");
const sendMessage = async (req, res) => {
  try {
    const created_by = req.body.user;
    const created_to = req.body.to;
    const chat = req.body.message;
    const user = await User.findById(created_by).populate("name");
    const to = await User.findById(created_to).populate("name");
    console.log(user);
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

    const currUser = await User.findById(user).populate("dm_list", "-password");
    list = currUser.dm_list.filter((u) => u != user._id);

    return res.status(200).json({ list: list });
  } catch (err) {}
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    return res.status(200).json({
      name: user.name,
      email: user.email,
      bio: user.bio,
      username: user.username,
      id: user._id,
    });
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
const updateName = async (req, res) => {
  try {
    const { user, newname } = req.query;
    let userWithSameName = User.findOne("Name");
  } catch (err) {
    return res.status(500);
  }
};

const blockUser = async (req, res) => {};

const unblockUser = async (req, res) => {};

const getLastMessages = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const list = user.dm_list;
    const lastmessagelist = await Promise.all(
      list.map(async (rec) => {
        const lastmessage = await Chat.findOne({
          $or: [
            { created_by: req.id, created_to: rec },
            { created_to: req.id, created_by: rec },
          ],
        })
          .sort({ created_at: -1 })
          .limit(1)
          .lean();
        return {
          lastmessage,
        };
      })
    );
    console.log(lastmessagelist);
    res.status(200).json({ list: lastmessagelist });
  } catch (err) {}
};

const checkValidUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const is = await User.findOne({ username: username });
    if (is) {
      return res.status(400).json({ message: "already exists" });
    }
    return res.status(200).json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: "already exists" });
  }
};

const checkValidemail = async (req, res) => {
  try {
    const { username } = req.query;
    const is = await User.findOne({ email: email });
    if (is) {
      return res.status(400);
    }
    return res.status(201);
  } catch (err) {
    return res.status(500);
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const { userid, username, name, email, bio } = req.body;
    const updateField = {};
    if (username) updateField.username = username;
    if (name) updateField.name = name;
    if (email) updateField.email = email;
    if (bio) updateField.bio = bio;

    let updatedProfile = await User.findByIdAndUpdate(userid, {
      $set: updateField,
    });
    return res
      .status(200)
      .json({ message: "Profile updated", profile: updatedProfile });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};
const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ messag: "logged out successfully" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  sendMessage,
  getlist,
  getProfile,
  updateName,
  blockUser,
  searchUser,
  getChats,
  getLastMessages,
  checkValidUsername,
  updateProfile,
  logout,
};
