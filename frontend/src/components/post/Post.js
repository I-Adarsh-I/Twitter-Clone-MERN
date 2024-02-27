import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import axios from "axios";
import { Toaster, toast } from "alert";

const Post = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const imgUrl =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  const api_key = process.env.REACT_APP_BASE_API;
  const token = localStorage.getItem("token");

  //Like handler
  const likeHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = {
      postid: props.allPosts._id,
    };
    try {
      const resp = await axios.put(`${api_key}/like`, request, config);
      if (resp.status === 200) {
        props.getAllPosts();
        toast("post liked");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Unlike handler
  const unlikeHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = {
      postid: props.allPosts._id,
    };
    try {
      const resp = await axios.put(`${api_key}/unlike`, request, config);
      if (resp.status === 200) {
        props.getAllPosts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Load the initial like/unlike state from the server when the component mounts
    const fetchLikeState = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const resp = await axios.get(
          `${api_key}/likenunlike/${props.allPosts._id}/like-state`,
          config
        );
        setIsLiked(resp.data.isLiked);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLikeState(); // Fetch initial like state
  }, [props.allPosts._id]);

  //Like and unlike handler

  const likeAndUnlikeHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const resp = await axios.get(
        `${api_key}/likenunlike/${props.allPosts._id}/like-state`,
        config
      );
      const isAlreadyLiked = resp.data.isLiked;

      if (!isAlreadyLiked) {
        await likeHandler(props.allPosts._id);
        setIsLiked(true);
      } else {
        await unlikeHandler(props.allPosts._id);
        setIsLiked(false);
      }

      props.getAllPosts();
    } catch (err) {
      console.error(err);
    }
  };

  //Comment box handler
  const commentBoxHandler = () => {
    if (!commentBox) {
      setCommentBox(true);
    } else {
      setCommentBox(false);
    }
  };

  //Comment handler
  const commentPost = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = {
      postId: props.allPosts._id,
      commentText: commentText,
    };
    try {
      const resp = await axios.put(`${api_key}/comment`, response, config);
      if (resp.status === 200) {
        console.log(resp);
        props.getAllPosts();
        commentText('')
        return toast("Comment posted successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  const allCommentsTillNow = props.allPosts.comments;
  
  return (
    <div>
      <div className="post d-flex flex-column gap-2 mx-3 my-2">
        <div className="d-flex gap-2">
          <div className="l-post-con">
            <div className="avatar name-n-avatar rounded-pill overflow-hidden bg-light">
              <Avatar image={props.allPosts.author.profileImg} />
            </div>
          </div>
          <div className="r-post-con">
            <div className="d-flex gap-2 align-items-center">
              <h6 className="m-0">{props.allPosts.author.fullname}</h6>
              <div className="text-secondary d-flex align-items-center gap-2">
                <div style={{ width: "20px" }}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7641/7641727.png"
                    alt=""
                    className="w-100"
                  />
                </div>
                <span>@username</span>
                <span>•</span>
                <span>3h</span>
              </div>
            </div>
            <div>
              <p className="text-light">{props.allPosts.description}</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-evenly align-items-center">
          {isLiked ? (
            <>
              <div className="d-flex align-items-center">
                <div
                  className="icons"
                  role="button"
                  onClick={likeAndUnlikeHandler}
                >
                  <i
                    className="fa-solid fa-heart"
                    style={{ color: "#e00000" }}
                  ></i>
                </div>
                <p className="m-0 mb-1">{props.allPosts.likes.length}</p>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center">
                <div
                  className="icons"
                  role="button"
                  onClick={likeAndUnlikeHandler}
                >
                  <i className="fa-regular fa-heart"></i>
                </div>
                <p className="m-0 mb-1">{props.allPosts.likes.length}</p>
              </div>
            </>
          )}

          <div className="d-flex align-items-center">
            <div className="icons" role="button" onClick={commentBoxHandler}>
              <i className="fa-regular fa-comment"></i>
            </div>
            <p className="m-0 mb-1">{props.allPosts.comments.length}</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="icons" role="button">
              <i className="fa-solid fa-repeat"></i>
            </div>
            <p className="m-0 mb-1">1</p>
          </div>
          <div className="icons" role="button">
            <i className="fa-regular fa-bookmark"></i>
          </div>
        </div>
        {/* Comments */}
        {commentBox && (
          <>
            <div className="row">
              <div className="col-md-12">
                <form
                  className="w-100 d-flex align-items-center justify-content-between flex-row"
                  onSubmit={commentPost}
                >
                  <textarea
                    className="col-md-10 rounded bg-transparent text-light p-1"
                    placeholder="Comment"
                    name="comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-primary rounded-pill px-4"
                    type="submit"
                    onClick={commentPost}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
            <p className="m-0">Comments</p>

            {allCommentsTillNow.length > 0 &&
              allCommentsTillNow.map((comment, index) => (
                  <div className="d-flex flex-column" key={index}>
                    <hr className="m-0 mx-1" />
                    <div className="d-flex flex-row card my-2 bg-transparent">
                      <div className="avatar name-n-avatar rounded-pill overflow-hidden bg-light">
                        <Avatar image={props.allPosts.author.profileImg} />
                      </div>
                      <div className="comment px-2 d-flex flex-column justify-content-center gap-1">
                        <h6 className="m-0 text-white">{comment.commentedBy.fullname}</h6>
                        <p className="m-0 text-white">
                          {comment.commentText}
                        </p>
                      </div>
                    </div>
                  </div>
              ))}
          </>
        )}
        <Toaster />
      </div>
      <hr className="m-0" />
    </div>
  );
};

export default Post;
