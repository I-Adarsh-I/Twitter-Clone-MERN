import React, { useEffect, useState } from "react";
import "./profile.css";
import Avatar from "../../components/avatar/Avatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../post/Post";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "alert";

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

  const userAllPosts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const resp = await axios.get(`${api_key}/user/allposts/${id}`, config);
      if (resp.status === 200) {
        setUserPosts(resp.data.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Show user details dynamically
  const fetchUserDetails = async () => {
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
        const userDetailsJSON = JSON.stringify(resp.data.userDetails);
        localStorage.setItem("User", userDetailsJSON);
        setUser(resp.data.userDetails);
        setLoading(false);
      } else {
        toast.error(resp.data.error);
      }
    } catch (err) {
      console.log(err);
      toast.error("Internal server error");
    }
  };

  useEffect(() => {
    fetchUserDetails();
    userAllPosts();
  }, []);

  const userInformation = JSON.parse(localStorage.getItem("User"));

  //Follow/unfollow logic
  const followHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const request = {
      userId: id,
    };

    try {
      const resp = await axios.put(`${api_key}/follow`, request, config);

      if (resp.status === 200) {
        toast.success(resp.data.message);
        fetchUserDetails();
      } else {
        toast.error("Failed to follow user.");
      }
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  //Unfollow handler
  const unFollowHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const request = {
      userId: id,
    };

    try {
      const resp = await axios.put(`${api_key}/unfollow`, request, config);

      if (resp.status === 200) {
        toast.success(resp.data.message);
        fetchUserDetails();
      } else {
        toast.error("Failed to unfollow user.");
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
              {userInformation.followers.includes(userInfo._id) ? (
                <button
                  className="btn bg-transparent border text-white rounded-pill"
                  onClick={unFollowHandler}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="btn rounded-pill bg-white text-black border fw-semibold"
                  onClick={followHandler}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="profileBiography mx-4">
            <h5 className="m-0">{user.fullname}</h5>
            <p className="mb-3 text-secondary">@{user.fullname}</p>
            <p
              className="m-0 mb-2"
              style={{ wordWrap: "break-word", fontSize: "15px" }}
            >
              {userInformation.about}
            </p>
          </div>
          <div
            className="d-flex flex-wrap gap-3 additional-info mx-4 mb-3"
            style={{ fontSize: "15px" }}
          >
            <div className="d-flex gap-2 text-secondary">
              <div className="icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="info-text">{userInformation.location}</div>
            </div>
            <div className="d-flex gap-2 text-secondary">
              <div className="icon">
                <i className="fa-solid fa-paperclip"></i>
              </div>
              <div className="info-text ">
                <Link
                  className="text-decoration-none"
                  style={{ color: "#1DA1F2" }}
                >
                  {userInformation.otherLinks}
                </Link>
              </div>
            </div>
            <div className="d-flex gap-2 text-secondary">
              <div className="icon">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <div className="info-text">{userInformation.DOB}</div>
            </div>
          </div>
          <>
            <div className="mx-4 d-flex gap-3">
              <div className="d-flex gap-1">
                <p>
                  {userInformation &&
                  userInformation.following &&
                  userInformation.following.length > 0
                    ? userInformation.following.length
                    : 0}
                </p>
                <p className="text-secondary">Following</p>
              </div>
              <div className="d-flex gap-1">
                <p>
                  {userInformation &&
                  userInformation.followers &&
                  userInformation.followers.length > 0
                    ? userInformation.followers.length
                    : 0}
                </p>
                <p className="text-secondary">Followers</p>
              </div>
            </div>
          </>
          <div className="post-sec-head d-flex flex-column align-items-center">
            <p className="m-0">All Posts</p>
            <div className="underline"></div>
          </div>
          <hr className="m-0 mt-1" />
        </div>
        <div className="">
          {userPosts.length > 0 &&
            userPosts.map((post, index) => (
              <Post key={index} allPosts={post} getAllPosts={userAllPosts}/>
            ))}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
