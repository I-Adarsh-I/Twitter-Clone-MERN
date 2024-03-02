import React, { useEffect, useState } from "react";
import Avatar from "../../components/avatar/Avatar";
import "./feed.css";
import Post from "../post/Post";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from "alert";

const Feed = () => {
  const [userPost, setUserPost] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });
  const imgUrl =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  const api_key = process.env.REACT_APP_BASE_API;
  const token = localStorage.getItem("token");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  //File select function
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
      handleCloseModal()
      return resp;
    } catch (err) {
      console.error("Error uploading file: ", err);
      throw err;
    }
  };

  // Create a new post
  const createPost = async (e) => {
    e.preventDefault();

    let imgRes;
    if (image.data) {
      imgRes = await handleFileUpload();
    }

    let request
    if (imgRes){
      request = {
        description: userPost,
        image: `${api_key}/files/${imgRes.data.filename}`,
      };
    }else{
      request={
        description: userPost
      }
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.post(`${api_key}/createpost`, request, config);
      if (resp.status === 201) {
        setUserPost("");
        setImage({preview: "", data: ""})
        toast.success("Posted successfulluy")
        fetchAllPosts();
      } else if (resp.status === 400) {
        console.log(resp.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch all posts
  const fetchAllPosts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const resp = await axios.get(`${api_key}/allposts`, config);
      if (resp.status === 200) {
        setAllPosts(resp.data.posts);
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="feed-main">
      <div className="top-nav d-flex align-items-center justify-content-between">
        <div className="h5 mx-3">Home</div>
      </div>
      <hr className="m-0" />
      <div className="card border-dark-subtle bg-transparent p-2 border-0 mx-2">
        <div className="d-flex gap-3 ">
          <div className="l-post-con">
            <div className="avatar name-n-avatar rounded-pill overflow-hidden">
              <Avatar image={imgUrl} />
            </div>
          </div>
          <div className="l-con-post w-100">
            <form onSubmit={createPost}>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="1"
                placeholder="What's happening?!"
                className="post-textbox w-100 bg-transparent text-white fs-4 pb-3"
                value={userPost}
                onChange={(e) => setUserPost(e.target.value)}
              ></textarea>
              <div className="d-flex justify-content-between align-items-center">
                <i
                  className="fa-regular fa-image fa-lg"
                  style={{ color: "#1679BB", cursor: "pointer" }}
                  onClick={handleShowModal}
                ></i>
                <button
                  className="btn btn-primary rounded-pill px-4"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr className="m-0" />

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
              <span className="w-100 fw-bold">Upload Post</span>
            </div>
            <Modal.Header className="header-postup" closeButton></Modal.Header>
          </div>
          <div className="container row mb-3">
            <div
              className="col-md-6 d-flex flex-column justify-content-center align-items-center"
              role="button"
            >
              {image.preview ? (
                <div className="uploaded-img-container">
                  <img src={image.preview} className="user-uploaded-img" />
                </div>
              ) : (
                <div className="upload-post-box">
                  <div className="formbold-mb-5 formbold-file-input">
                    <input
                      type="file"
                      name="postImage"
                      id="postImage"
                      accept=".jpg, .png, .jpeg"
                      onChange={handleFileSelect}
                    />
                    <label htmlFor="postImage">
                      <div className="">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          className="mb-2"
                          style={{
                            color: "lightgray",
                            height: "50px",
                            width: "50px",
                          }}
                        />
                        <div className="upload-post-text w-100">
                          <p className="m-0 text-nowrap">
                            <a className="upload-post-text link-offset-2 link-underline text-decoration-none ">
                              Upload media from device
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
              <form className="mb-5">
                <div className="mb-3">
                  <textarea
                    placeholder="Add caption"
                    className="post-textbox upload-media bg-transparent text-white"
                    id="exampleFormControlTextarea1"
                    value={userPost}
                    onChange={(e) => setUserPost(e.target.value)}
                    rows="2"
                  ></textarea>
                </div>
              </form>
              <div className="post-btn d-flex justify-content-end">
                <button className="btn btn-primary px-4 rounded-pill" onClick={createPost}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {allPosts.length > 0 &&
        allPosts.map((post, index) => (
          <Post key={index} allPosts={post} getAllPosts={fetchAllPosts} />
        ))}
        <Toaster position="bottom-right"/>
    </div>
  );
};

export default Feed;
