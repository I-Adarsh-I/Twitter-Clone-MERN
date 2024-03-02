import React, { useEffect, useState, useRef } from "react";
import "./profile.css";
import Avatar from "../../components/avatar/Avatar";
import { Link } from "react-router-dom";
import UserPost from "../post/UserPost";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Toaster, toast } from "alert";
import { logginSuccessful } from "../../redux/slices/UserSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });

  const [userInput, setUserInput] = useState({
    username: "",
    about: "",
    location: "",
    link: "",
    DOB: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const api_key = process.env.REACT_APP_BASE_API;
  const token = localStorage.getItem("token");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  //Show user's all post
  const userAllPosts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const resp = await axios.get(`${api_key}/mygallery`, config);
      if (resp.status === 200) {
        setUserPosts(resp.data.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //File select
  const handleFileSelect = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
    console.log(img);
  };

  // File upload function
  const handleFileUpload = async () => {
    try {
      let formData = new FormData();
      formData.append("file", image.data);

      const resp = await axios.post(`${api_key}/upload`, formData);
      toast.success("Post created successfully");
      handleCloseModal();
      return resp;
    } catch (err) {
      console.error("Error uploading file: ", err);
      throw err;
    }
  };

  //Edit user profile information
  const profileUpdate = async (e) => {
    e.preventDefault();
    if (
      !userInput.username &&
      !userInput.location &&
      !userInput.link &&
      !userInput.about &&
      !userInput.DOB
    ) {
      toast.error("All fields cannot be empty");
    } else {
      setUserInput({
        username: userInput.username || userInfo.username,
        location: userInput.location || userInfo.location,
        link: userInput.link || userInfo.otherLinks,
        about: userInput.about || userInfo.about,
        DOB: userInput.DOB || userInfo.DOB,
      });
    }

    try {
      const request = {
        username: userInput.username,
        about: userInput.about,
        location: userInput.location,
        DOB: userInput.DOB,
        otherLinks: userInput.link,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.put(`${api_key}/user/editinfo`, request, config);
      if (resp.status === 200) {
        toast.success("Profile updated successfully");
        // console.log(resp.data);
        handleCloseModal();
        setUserInput({
          username: "",
          about: "",
          location: "",
          link: "",
          DOB: "",
        });

        dispatch(logginSuccessful(resp.data));
      } else if (resp.status === 400) {
        toast.error(resp.response.data.error);
      }
    } catch (err) {
      // console.log(err);
      toast.error(err.response.data.error);
    }
  };
  useEffect(() => {
    userAllPosts();
  }, []);

  const userInfo = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="profile-main">
        <div className="profileHeader">
          <div
            className="more-options rounded-pill align-items-center justify-content-center ms-4"
            role="button"
          >
            <Link to={"/"} className="text-white">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>
          <div className="mx-4">
            <p className="m-0">{userInfo.fullname}</p>
            <p className="m-0 text-secondary">{userPosts.length} Tweets</p>
          </div>
        </div>
        <div className="profile-head">
          <div className="backgroundImage"></div>
          <div className="profileTitle">
            <div className="profileImage p-1">
              <Avatar image={userInfo.profileImg} br={"rounded-pill"} />
            </div>
            <div className="editProfile">
              <button
                className="btn rounded-pill text-light border"
                onClick={handleShowModal}
              >
                Edit profile
              </button>
            </div>
          </div>
          <div className="profileBiography mx-4">
            <h5 className="m-0">{userInfo.fullname}</h5>
            {userInfo.username ? (
              <p className="mb-3 text-secondary">@{userInfo.username}</p>
            ) : (
              <p className="mb-3 text-secondary">@{userInfo.fullname}</p>
            )}
            <p
              className="m-0 mb-2"
              style={{ wordWrap: "break-word", fontSize: "15px" }}
            >
              {userInfo.about}
            </p>
          </div>
          <div
            className="additional-info d-flex flex-wrap gap-4 mx-4 mb-3"
            style={{ fontSize: "15px" }}
          >
            {userInfo.location && (
              <div className=" d-flex gap-2 text-secondary">
                <div className="icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="info-text">{userInfo.location}</div>
              </div>
            )}
            {userInfo.otherLinks && (
              <div className=" d-flex gap-2 text-secondary">
                <div className="icon">
                  <i className="fa-solid fa-paperclip"></i>
                </div>
                <div className="info-text ">
                  <Link
                    className="text-decoration-none"
                    style={{ color: "#1DA1F2" }}
                    to={userInfo.otherLinks}
                    target="_blank"
                  >
                    {userInfo.otherLinks}
                  </Link>
                </div>
              </div>
            )}
            {userInfo.DOB && (
              <div className="d-flex gap-2 text-secondary">
                <div className="icon">
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <div className="info-text">{userInfo.DOB}</div>
              </div>
            )}
          </div>
          <div className="mx-4 d-flex gap-3">
            <div className="d-flex gap-1">
              <p>{userInfo.following.length}</p>
              <p className="text-secondary">Following</p>
            </div>
            <div className="d-flex gap-1">
              <p>{userInfo.followers.length}</p>
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
              <UserPost key={index} allPosts={post} getAllPosts={userAllPosts}/>
            ))}
        </div>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="modal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="feed-modal border border-dark rounded">
            <div className="upper-layer d-flex justify-content-between align-items-center px-4 my-2 rounded">
              <div className="col-6 d-flex align-items-center justify-content-start">
                <span className="w-100 fw-bold">Edit profile</span>
              </div>
              <Modal.Header
                className="header-postup"
                closeButton
              ></Modal.Header>
            </div>
            <div className="container row mb-3">
              <div
                className="col-md-6 d-flex flex-column justify-content-center align-items-center"
                role="button"
              >
                {image.preview ? (
                  <div className="uploaded-img-container p-1">
                    <Avatar image={image.preview} />
                  </div>
                ) : (
                  <div className="">
                    <div className="formbold-file-input ano d-flex flex-column justify-content-center align-items-center">
                      <div className="h-50 w-50 p-1">
                        <Avatar
                          image={userInfo.profileImg}
                          br={"rounded-pill"}
                        />
                      </div>
                      <input
                        type="file"
                        name="postImage"
                        id="postImage"
                        accept=".jpg, .png, .jpeg"
                        onChange={handleFileSelect}
                      />
                      <label htmlFor="postImage">
                        <div className="">
                          <div className="upload-post-text w-100">
                            <p className="m-0 text-nowrap">
                              <a className="upload-post-text btn btn-secondary btn-sm px-3 ">
                                Change profile photo
                              </a>
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <form onSubmit={profileUpdate}>
                  <div className="mb-3 ">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text bg-dark text-white border-dark"
                        id="basic-addon1"
                        style={{ width: "40px" }}
                      >
                        @
                      </span>
                      <input
                        type="text"
                        className="pop-form form-control bg-transparent text-white border-dark"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="username"
                        value={userInput.username}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="mb-3 ">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text bg-dark text-white border-dark"
                        id="basic-addon1"
                        style={{ width: "40px" }}
                      >
                        <i className="fa-regular fa-address-card"></i>
                      </span>
                      <input
                        type="text"
                        className="pop-form form-control bg-transparent text-white border-dark"
                        placeholder="About"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="about"
                        value={userInput.about}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="mb-3 ">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text bg-dark text-white border-dark"
                        id="basic-addon1"
                        style={{ width: "40px" }}
                      >
                        <i className="fa-solid fa-location-dot"></i>
                      </span>
                      <input
                        type="text"
                        className="pop-form form-control bg-transparent text-white border-dark"
                        placeholder="Location"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="location"
                        value={userInput.location}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="mb-3 ">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text bg-dark text-white border-dark"
                        id="basic-addon1"
                        style={{ width: "40px" }}
                      >
                        <i className="fa-solid fa-link fa-sm"></i>
                      </span>
                      <input
                        type="text"
                        className="pop-form form-control bg-transparent text-white border-dark"
                        placeholder="Link"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="link"
                        value={userInput.link}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="mb-3 ">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text bg-dark text-white border-dark"
                        id="basic-addon1"
                        style={{ width: "40px" }}
                      >
                        <i className="fa-solid fa-calendar-days"></i>
                      </span>
                      <input
                        type="date"
                        className="pop-form form-control bg-transparent text-white border-dark"
                        placeholder="D.O.B."
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="DOB"
                        value={userInput.DOB}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="post-btn d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-primary px-3 btn-sm"
                      type="submit"
                      onClick={profileUpdate}
                    >
                      save
                    </button>
                    <button
                      className="btn btn-danger px-3 btn-sm"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
