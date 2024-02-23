import React from "react";
import Avatar from "../../components/avatar/Avatar";
import "./feed.css";
import Post from "../post/Post";

const Feed = () => {
  const imgUrl =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  return (
    <div className="feed-main">
      <div className="top-nav d-flex align-items-center justify-content-between">
        <div className="h5 mx-3">Home</div>
      </div>
      <hr className="m-0"/>
      <div className="card border-dark-subtle bg-transparent p-2 border-0 mx-2">
        <div className="d-flex gap-3 ">
          <div className="l-post-con">
            <div className="avatar name-n-avatar rounded-pill overflow-hidden">
              <Avatar image={imgUrl} />
            </div>
          </div>
          <div className="l-con-post w-100">
            <form>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="1"
                placeholder="What's happening?!"
                className="post-textbox w-100 bg-transparent text-white fs-4 pb-3"
              ></textarea>
            </form>
            <div className="d-flex justify-content-between align-items-center">
              <i
                class="fa-regular fa-image fa-lg"
                style={{ color: "#1679BB" }}
                role="button"
              ></i>
              <button className="btn btn-primary rounded-pill px-4">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="m-0" />

      {/* post */}
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;
