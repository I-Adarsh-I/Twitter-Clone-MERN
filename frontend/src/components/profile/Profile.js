import React from "react";
import "./profile.css";

const Profile = () => {
  return (
    <div className="profile-main">
      <div className="top-nav d-flex align-items-center justify-content-between my-1">
        <div className="mx-2">
          <div className="h5">Name</div>
          <p className="text-secondary m-0">2 posts</p>
        </div>
      </div>
      <div className="cov-img w-100">
        <img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1024,h_341/https://blog.snappa.com/wp-content/uploads/2020/01/Best-Twitter-Header-Image-Size-1024x341.jpg" alt="cover" className="w-100"/>
      </div>
    </div>
  );
};

export default Profile;
