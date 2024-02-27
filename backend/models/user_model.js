var express = require("express");
var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImg: {
    type: String,
    default: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg",
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
