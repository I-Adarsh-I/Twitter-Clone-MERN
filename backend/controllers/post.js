var express = require("express");
var mongoose = require("mongoose");
var userModel = require("../models/user_model");
var postModel = require("../models/post_model");
var protectedRoutes = require("../middlewares/protectedRoutes");

module.exports.createPostHandler = async (req, res) => {
  const { description, image } = req.body;

  try {
    if (!description) {
      return res
        .status(400)
        .json({ error: "Post description cannot be empty" });
    }

    req.user.password = undefined;

    const postObj = new postModel({
      description,
      author: req.user,
      image
    });
    const newPost = await postObj.save();

    res.status(201).json({ post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.showAllPosts = async (req, res) => {
  try {
    const allPosts = await postModel
      .find()
      .populate("author", "_id fullname profileImg DOB otherLinks location followers following username")
      .populate("comments.commentedBy", "_id fullname")
      .populate("retweets.retweetedBy", "_id fullname")
    res.status(200).json({ posts: allPosts });
  } catch (err) {
    console.log(err);
  }
};

//All posts of logged in user
module.exports.showAllPostsOfLoggedInUser = async (req, res) => {
  try {
    //Finding posts made by author using author id and populating the author with fields - id, fullname, profile image
    const allPosts = await postModel
      .find({ author: req.user._id })
      .populate("author", "_id fullname profileImg");
    res.status(200).json({ posts: allPosts });
    console.log("My all posts: ", req.user);
  } catch (err) {
    console.log(err);
  }
};


//All post of a user
module.exports.showPostsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const postsOfUser = await postModel
      .find({ author: userId }) // Find posts by the specified user ID
      .populate("author", "_id fullname profileImg DOB otherLinks location followers following username")
      .populate("comments.commentedBy", "_id fullname")
      .populate("retweets.retweetedBy", "_id fullname");

    if (!postsOfUser) {
      return res.status(404).json({ error: 'No posts found for this user' });
    }

    res.status(200).json({ posts: postsOfUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Delete post
module.exports.deletePost = async (req, res) => {
  try {
    const postDel = await postModel
      .findOne({ _id: req.params.postid })
      .populate("author", "_id");

    if (!postDel) {
      return res.status(400).json({ error: "Post does not exist" });
    }
    //check whether logged in user is the author who is trying to delete the post

    if (postDel.author._id.toString() === req.user._id.toString()) {
      const deletedPost = await postModel.deleteOne({ _id: postDel._id });
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res
        .status(403)
        .json({ error: "You are not authorized to delete the post" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Like functionality
module.exports.likes = async (req, res) => {
  try {
    const like = await postModel
      .findByIdAndUpdate(
        req.body.postid,
        {
          $push: { likes: req.user._id }, //Pushing id of user who liked the post to likes array (defined in post_model.js)
        },
        {
          new: true, // returns updated records
        }
      )
      .populate("author", "_id fullname"); //Populate the author with updated documents with the fields id and fullname
    //populate method is useful for retrieving related data from another collections.

    if (!like) {
      res.status(400).json({ error: "Post could not be found" });
    } else {
      res
        .status(200)
        .json({
          message: `Post liked by ${req.user.fullname}`,
          user: req.user.fullname,
        });
    }
    console.log("logging user in likes: ", req.user);
  } catch (err) {
    console.log(err);
    res.status(500).josn({ error: "Internal server error" });
  }
};

//Unlike functionality
module.exports.unlike = async (req, res) => {
  try {
    const unlike = await postModel
      .findByIdAndUpdate(
        req.body.postid,
        {
          $pull: { likes: req.user._id }, //removing the id of user who liked the post
        },
        {
          new: true, // returns updated records
        }
      )
      .populate("author", "_id fullname"); //Populate the author with updated documents with the fields id and fullname
    //populate method is useful for retrieving related data from another collections.

    if (!unlike) {
      res.status(400).json({ error: "Post could not be found" });
    } else {
      res.status(200).json({ message: `Post unliked by ${req.user.fullname}` });
    }
    console.log("logging user in likes: ", req.user);
  } catch (err) {
    console.log(err);
    res.status(500).josn({ error: "Internal server error" });
  }
};

//Comment functionality
module.exports.comment = async (req, res) => {
  const { postId, commentText } = req.body;
  const comment = {
    commentText: commentText,
    commentedBy: req.user._id,
  };
  try {
    const postedComment = await postModel
      .findByIdAndUpdate(
        postId,
        {
          $push: { comments: comment },
        },
        {
          new: true, // returns updated records
        }
      )
      .populate("comments.commentedBy", "_id fullname") //comment owner
      .populate("author", "_id fullname"); //Post owner

    if (!postedComment) {
      res.status(400).json({ error: "Post could not be found" });
    } else {
      res
        .status(200)
        .json({
          message: `${req.user.fullname} commented on your post`,
          user: postedComment,
        });
    }
    // console.log("Posted Comment:", postedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Retweet funtionality
module.exports.retweetHandler = async (req, res) => {
  try {
    const { retweetText, postId } = req.body;

    const originalPost = await postModel.findById(postId);
    if (!originalPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isExistingRetweet = await postModel.findOne({ originalPost: postId });
    if (isExistingRetweet) {
      return res.status(400).json({ error: "Post already retweeted" });
    }

    const retweet = {
      retweetText: retweetText,
      retweetedBy: req.user._id,
      retweetBody: postId,
      isRetweet: true
    }

    const retweetByUser = await postModel
      .findByIdAndUpdate(
        postId,
        {
          $push: { retweets: retweet },
        },
        {
          new: true,
        }
      )
      .populate("retweets.retweetedBy", "_id fullname")
      .populate('retweets.retweetBody', "_id description image")
      .populate("author", "_id fullname");

      res.status(200).json({message: 'Post retweeted', retweet: retweetByUser});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Additional functionality
module.exports.postLikeAndUnlike = async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).json({ error: "User not authorized" });
    }
    const { postId } = req.params;
    const post = await postModel.findById(postId);

    if (!post) {
      res.status(404).json({ error: "Post does not exist" });
    }
    const currentUserLikedPost = post.likes.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    // Return the like state of the current user for the post
    res.json({ isLiked: currentUserLikedPost });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
