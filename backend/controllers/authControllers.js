const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    const existing_user = await User.findOne({ email: email });
    if (existing_user) {
      return res.status(400).json({ message: "email already registerd!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
      username: username,
    });

    token = jwt.sign(
      { id: newUser._id, name: newUser.name, sameSite: "None" },
      process.env.SECRET_KEY
    );
    res.cookie("token", token, {
      maxage: 100000,
      httponly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({ message: "Email Registered Successfully" });
  } catch (err) {
    res.status(500).json({
      message: "something went wrong while registering the user",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    existing_user = await User.findOne({ email: email });

    if (existing_user) {
      result = await bcrypt.compare(password, existing_user.password);
      if (!result) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      token = jwt.sign(
        { id: existing_user._id, name: existing_user.name },
        process.env.SECRET_KEY
      );
      res.cookie("token", token, {
        maxage: 100000,
        httponly: true,
        secure: true,
        sameSite: "None",
      });

      res.status(200).json({ message: "login successfull" });
    } else {
      res.status(404).json({ message: "email not registered" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ maeesage: "something went wrong while logging the user" });
  }
};

const verify = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Invalid Access" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid Access" });
    }
    req.id = decoded.id;
    res.status(200).json({ message: "verified", id: decoded.id });
  } catch (err) {}
};
const logout = async (req, res) => {};

module.exports = { register, login, logout, verify };
