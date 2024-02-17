var express = require("express");
var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImg: {
    type: String,
    default: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
