import React, { useEffect, useState } from "react";
import "./profile.css";
import Avatar from "../../components/avatar/Avatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserPost from "../post/UserPost";
import axios from "axios";
import { useSelector } from "react-redux";
import { Toaster, toast } from "alert";

const UserProfile = () => {
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const imgUrl =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  const api_key = process.env.REACT_APP_BASE_API;
  const token = localStorage.getItem("token");

  const userInfo = useSelector((state) => state.auth.user);

  // const userAllPosts = async () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     const resp = await axios.get(`${api_key}/mygallery`, config);
  //     if (resp.status === 200) {
  //       setUserPosts(resp.data.posts);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Show user details dynamically
  const userDetails = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const resp = await axios.get(`${api_key}/user/${id}`, config);
      setLoading(true);
      if (resp.status === 200) {
        // console.log(resp.data.userDetails);
        const currentUserProfile = resp.data.userDetails;
        setUser(currentUserProfile);
        setLoading(false);
      } else {
        toast.error(resp.data.error);
      }
    } catch (err) {
      console.log(err);
      toast.error("Internal server error");
    }
  };

  //Follow/unfollow logic
  const followHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const request = {
      userId: id
    }
  
    try {
      const resp = await axios.put(`${api_key}/follow`,request, config);
      console.log(resp); // Log the response to inspect any error messages
  
      if (resp.status === 200) {
        toast.success(resp.data.message);
      } else {
        toast.error("Failed to follow user.");
      }
    } catch (err) {
      console.log(err.response); // Log the error response for debugging
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <>
      <div className="profile-main">
        <div className="profileHeader">
          <div
            className="more-options rounded-pill align-items-center justify-content-center ms-4"
            role="button"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="mx-4">
            <p className="m-0">{user.fullname}</p>
            <p className="m-0 text-secondary">{userPosts.length} Tweets</p>
          </div>
        </div>
        <div className="profile-head">
          <div className="backgroundImage"></div>
          <div className="profileTitle">
            <div className="profileImage p-1">
              <Avatar image={user.profileImg} br={"rounded-pill"} />
            </div>
            <div className="editProfile">
              <button className="btn rounded-pill bg-white text-black border fw-semibold" onClick={followHandler}>
                Follow
              </button>
            </div>
          </div>
          <div className="profileBiography mx-4">
            <span>{user.fullname}</span>
            <p className="mb-3 text-secondary">@{user.fullname}</p>
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
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="info-text">Location</div>
            </div>
            <div className="col col-4 d-flex gap-2 text-secondary">
              <div className="icon">
                <i className="fa-solid fa-paperclip"></i>
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
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <div className="info-text">DD-MM-YYYY</div>
            </div>
          </div>
          <div className="mx-4 d-flex gap-3">
            <div className="d-flex gap-1">
              <p>{user.following > 0 ? user.following.length : "0"}</p>
              <p className="text-secondary">Following</p>
            </div>
            <div className="d-flex gap-1">
              <p>{user.followers > 0 ? user.followers.length : "0"}</p>
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
          {userPosts.length > 0 &&
            userPosts.map((post, index) => (
              <UserPost key={index} allPosts={post} />
            ))}
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default UserProfile;
