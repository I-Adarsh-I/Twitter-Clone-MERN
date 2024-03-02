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
      return res.status(404).json({ message: "User already exists" });
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

    const token = jwt.sign(
      { _id: existingUser._id, email: existingUser.email },
      SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("User token", token, {
      sameSite: "strict",
      httpOnly: true,
    });
    return res.status(200).json({
      message: "Login successful",
      user: { existingUser },
      token: { token },
    });
  } catch (err) {
    console.error("Error while logging in: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.logoutHandler = async (req, res) => {
  try {
    res.clearCookie("User token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Follow handler
module.exports.followHandler = async (req, res) => {
  try {
    const {userId} = req.body;
    const currentUser = req.user;

    const isAlreadyFollowing = currentUser.following.some(
      (followedUser) => followedUser._id.toString() === userId
    );

    if (isAlreadyFollowing) {
      return res.status(400).json({ error: "Already following user" });
    }
    const followUser = await userModel
      .findByIdAndUpdate(
        {
          _id: currentUser._id,
        },
        {
          $push: { following: userId },
        },
        {
          new: true,
        }
      )
      .populate("following", "_id fullname profileImg email");

    const updatedFollowedUser = await userModel.findByIdAndUpdate(
      userId,
      { $push: { followers: currentUser._id } },
      { new: true }
    );

    const followedUserName = updatedFollowedUser.fullname;
    res.status(200).json({
      message: `You are now following ${followedUserName}`,
      following: followUser.following,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Unfollow handler
module.exports.unFollowHandler = async (req, res) => {
  try {
    const {userId} = req.body;
    const currentUser = req.user;

    const isAlreadyFollowing = currentUser.following.some(
      (followedUser) => followedUser._id.toString() === userId
    );

    if (!isAlreadyFollowing) {
      return res
        .status(400)
        .json({ error: "You need to follow user before unfollowing them" });
    }
    const followUser = await userModel
      .findByIdAndUpdate(
        {
          _id: currentUser._id,
        },
        {
          $pull: { following: userId },
        },
        {
          new: true,
        }
      )
      .populate("following", "_id fullname profileImg email");

    const followeduser = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { followers: currentUser._id } },
      { new: true }
    );

    const followedUserName = followeduser.fullname;
    res.status(200).json({
      message: `Unfollowed ${followedUserName}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Get all user
module.exports.getAllUserDetails = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming userId is passed as a parameter

    const userDetails = await userModel.findOne({ _id: userId }).select('-password');
    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ userDetails });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


//Edit profile information
module.exports.editProfileInfo = async (req, res) => {
  const { username, about, location, otherLinks, DOB, profileImg } = req.body;

  try {
    // Check if username is already taken
    const isUsernameExist = await userModel.findOne({ username: username });
    if (isUsernameExist) {
      return res.status(400).json({ error: 'User already registered with this username' });
    }

    const userID = req.user._id;

    const updatedInfo = {
      username,
      about,
      location,
      otherLinks,
      DOB,
      profileImg
    };

    const updatedRecord = await userModel.findByIdAndUpdate(
      userID,
      updatedInfo,
      { new: true }
    );

    res.json(updatedRecord); // Send back the updated user record
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
