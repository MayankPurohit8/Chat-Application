import bcrypt from "bcrypt";
import User from "../models/userModel";
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    existing_user = await User.find({ email: email });
    if (!existing_user) {
      const salt = bcrypt.genSalt(10);
      const hash = bcrypt.hash(password, salt);
      const newUser = User.create({
        name: name,
        email: email,
        password: hash,
      });
      res.status().json({ message: "Email Registered Successfully" });
    } else {
      res.status().json({ message: "Email already exists!" });
    }
  } catch (err) {
    res
      .status()
      .json({ message: "something went wrong while registering the user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    existing_user = await User.find({ emaiL: email });

    if (existing_user) {
      result = await bcrypt.compare(password, hash);
      if (!result) {
        return res.status().json({ message: "Incorrect password" });
      }
      token = jwt.sign(
        { id: existing_user._id, name: existing_user.name },
        "12345"
      );
      res.cookie("token", token, { maxage: 100000, httponly: true });
      res.status().json({ measage: "login successfull" });
    } else {
      res.status().json({ message: "email not registered" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ maeesage: "something went wrong while logging the user" });
  }
};
const logout = async (req, res) => {};

module.exports = { register, login, logout };
