import React from "react";
import Avatar from "../avatar/Avatar";

const Post = () => {
  const imgUrl =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";
  return (
    <div>
      <div className="post d-flex flex-column gap-3">
        <div className="d-flex gap-2">
          <div className="l-post-con">
            <div className="avatar name-n-avatar rounded-pill overflow-hidden">
              <Avatar image={imgUrl} />
            </div>
          </div>
          <div className="r-post-con">
            <div className="d-flex gap-2 align-items-center">
              <h6 className="m-0">Name</h6>
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
              <p className="text-light">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat minima quam quidem, id voluptate fugit. Ducimus fugit ab
                ratione illum?
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-evenly align-items-center">
          <div className="d-flex align-items-center">
            <div className="icons" role="button">
              <i class="fa-regular fa-heart"></i>
            </div>
            <p className="m-0 mb-1">1</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="icons" role="button">
              <i class="fa-regular fa-comment"></i>
            </div>
            <p className="m-0 mb-1">1</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="icons" role="button">
              <i class="fa-solid fa-repeat"></i>
            </div>
            <p className="m-0 mb-1">1</p>
          </div>
          <div className="icons" role="button">
            <i class="fa-regular fa-bookmark"></i>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Post;
