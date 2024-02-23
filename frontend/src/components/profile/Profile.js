import React from "react";
import "./profile.css";
import Avatar from "../../components/avatar/Avatar";
import { Link } from "react-router-dom";
import Post from "../post/Post";

const Profile = () => {
  const imgUrl =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";
  return (
    <>
      <div className="profile-main">
        <div className="profileHeader">
          <div
            className="more-options rounded-pill align-items-center justify-content-center ms-4"
            role="button"
          >
            <i class="fa-solid fa-arrow-left"></i>
          </div>
          <div className="mx-4">
            <p className="m-0">Name</p>
            <p className="m-0 text-secondary">12 Tweets</p>
          </div>
        </div>
        <div className="profile-head">
          <div className="backgroundImage"></div>
          <div className="profileTitle">
            <div className="profileImage p-1">
              <Avatar image={imgUrl} br={"rounded-pill"} />
            </div>
            <div className="editProfile">
              <button className="btn rounded-pill text-light border">
                Edit profile
              </button>
            </div>
          </div>
          <div className="profileBiography mx-4">
            <span>Name</span>
            <p className="mb-3 text-secondary">@username</p>
            <p
              className="m-0 mb-2"
              style={{ wordWrap: "break-word", fontSize: "15px" }}
            >
              Junior Software Developer || this || that
            </p>
          </div>
          <div
            className="additional-info row row-md-3 row-sm-2 g-2 mx-4 mb-3"
            style={{ fontSize: "15px" }}
          >
            <div className="col col-4 d-flex gap-2 text-secondary">
              <div className="icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div className="info-text">Location</div>
            </div>
            <div className="col col-4 d-flex gap-2 text-secondary">
              <div className="icon">
                <i class="fa-solid fa-paperclip"></i>
              </div>
              <div className="info-text ">
                <Link
                  className="text-decoration-none"
                  style={{ color: "#1DA1F2" }}
                >
                  Profile/portfolio link
                </Link>
              </div>
            </div>
            <div className="col col-4 d-flex gap-2 text-secondary">
              <div className="icon">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div className="info-text">DD-MM-YYYY</div>
            </div>
          </div>
          <div className="mx-4 d-flex gap-3">
            <div className="d-flex gap-1">
              <p>167</p>
              <p className="text-secondary">Following</p>
            </div>
            <div className="d-flex gap-1">
              <p>167</p>
              <p className="text-secondary">Followers</p>
            </div>
          </div>
          <div className="post-sec-head d-flex flex-column align-items-center">
            <p className="m-0">All Posts</p>
            <div className="underline"></div>
          </div>
          <hr className="m-0 mt-1" />
        </div>
        <div className="">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </>
  );
};

export default Profile;
