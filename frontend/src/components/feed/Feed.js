import React from "react";
import Avatar from "../../components/avatar/Avatar";
import "./feed.css";

const Feed = () => {
  const imgUrl =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  return (
    <div className="feed-main mx-4">
      <div className="top-nav d-flex align-items-center justify-content-between my-2">
        <div className="h5">Home</div>
      </div>
      <hr />
      <div className="card border-dark-subtle bg-transparent p-2 border-0">
        <div className="d-flex gap-3 ">
          <div className="r-post-con">
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
                className="post-textbox w-100 bg-transparent text-white border-0 fs-4 pb-3"
              ></textarea>
            </form>
            <hr className="border" />
            <div className="d-flex justify-content-between align-items-center">
            <i class="fa-regular fa-image fa-lg" style={{color:'#1679BB'}} role="button"></i>
              <button className="btn btn-primary rounded-pill px-4">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Feed;
