var express = require("express");
var mongoose = require("mongoose");
var { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  author: {
    type: ObjectId,
    ref: "User",
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  retweets: [
    {
        retweetText: String,
        retweetBody: {
            type: ObjectId,
            ref: 'post',
        },
        retweetedBy: {
            type: ObjectId,
            ref: "User"
        }
    }
  ],
  isRetweet: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      commentText: String,
      commentedBy: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
