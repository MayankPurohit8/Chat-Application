const mongoose = require("mongoose");
const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (err) {}
};

module.exports = connectDB;
