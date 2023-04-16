const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.TOKEN_KEY;

const User = require("../models/Login.js");
const UserSchema = mongoose.model("User", User);

const signup = async (req, res) => {
  const { userId, password, username } = req.body;
  try {
    const existingUser = await UserSchema.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = new UserSchema({
      username: username,
      password: hashedPassword,
      userId: userId,
    });
    const val = await result.save();
    const token = jwt.sign({ result }, SECRET_KEY, { expiresIn: "300s" });
    res.status(201).json({ user: val, token: token });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized Creadentials" });
  }
};

const signin = async (req, res) => {
  const { password, username } = req.body;
  try {
    const existingUser = await UserSchema.findOne({ username: username });
    if (!existingUser) {
      return res.status(404).json({ message: "Not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ existingUser }, SECRET_KEY, { expiresIn: "2h" });
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized Creadentials" });
  }
};

module.exports = { signup, signin };
