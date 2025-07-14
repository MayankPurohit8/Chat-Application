const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  profile_pic: { type: String },
  Bio: { Type: String },
  dm_list: [{ Type: mongoose.Types.ObjectId }],
});

modules.export = mongoose.model("User", UserSchema);
