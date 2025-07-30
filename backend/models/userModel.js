const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  profile_pic: { type: String },
  bio: { type: String },
  dm_list: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", UserSchema);
