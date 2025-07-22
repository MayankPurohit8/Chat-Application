const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  profile_pic: { type: String },
  Bio: { type: String },
  dm_list: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", UserSchema);
