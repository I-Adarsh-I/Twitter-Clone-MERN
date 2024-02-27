import React, { useEffect, useState } from "react";
import Avatar from "../../components/avatar/Avatar";
import "./feed.css";
import Post from "../post/Post";
import axios from "axios";

const Feed = () => {
  const [userPost, setUserPost] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const imgUrl =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  const api_key = process.env.REACT_APP_BASE_API;
  const token = localStorage.getItem("token");

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const request = {
        description: userPost,
      };
      const resp = await axios.post(`${api_key}/createpost`, request, config);
      if (resp.status === 201) {
        return fetchAllPosts();
        // return console.log(resp.data);
      } else if (resp.status === 400) {
        return console.log(resp.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllPosts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const resp = await axios.get(`${api_key}/allposts`, config);
      if (resp.status === 200) {
        setAllPosts(resp.data.posts);
      }
      // console.log(resp)
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
                  style={{ color: "#1679BB" }}
                  role="button"
                ></i>
                <button
                  className="btn btn-primary rounded-pill px-4"
                  type="submit"
                  onClick={createPost}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr className="m-0" />

      {/* post */}
      {allPosts.length > 0 &&
        allPosts.map((post, index) => <Post key={index} allPosts={post} getAllPosts={fetchAllPosts}/>)}
    </div>
  );
};

export default Feed;
