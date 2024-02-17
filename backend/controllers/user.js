var express = require("express");
var mongoose = require("mongoose");
var router = require("../routes/index");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var userModel = require("../models/user_model");
var cookieParser = require("cookie-parser");
var { SECRET_KEY } = require("../config");


module.exports.signUpHandler = async (req, res) => {
  const { number, fullname, email, password } = req.body;
  try {
    const isExistingUser = await userModel.findOne({ email });
    if (isExistingUser) {
      res.status(404).json({ message: "User already exists" });
    } else {
      const hashedPass = await bcrypt.hash(password, 12);
      const newUser = await userModel.create({
        number,
        fullname,
        email,
        password: hashedPass,
      });
      console.log("New user created: ", newUser);
      res.status(200).json({ message: "User resgistered successfully!" });
    }
  } catch (err) {
    console.log("error while signing up: ", err);
  }
};

module.exports.loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "User not registered!" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign({ _id:existingUser._id, email: existingUser.email }, SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("User token", token, {
      sameSite: "strict",
      httpOnly: true,
    });
    return res.status(200).json({ message: "User logged in successfully", user: {existingUser}, token:{token} });
  } catch (err) {
    console.error("Error while logging in: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.logoutHandler = async(req,res) => {
  try {
    res.clearCookie("User token")
    return res.status(200).json({message: "User logged out successfully"})
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Internal server error" });
  }

} 