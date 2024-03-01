import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import R_Sidebar from "../../components/sidebar/R_Sidebar";
import UserProfileComp from "../../components/profile/UserProfile";

const UserProfile = () => {
  const handleScroll = (e) => {
    if (e.target.closest(".sidebar-main")) {
      e.preventDefault();
      return false;
    }
  };
  return (
    <div className="container d-flex home-main" onWheel={handleScroll}>
      <Sidebar />
      <UserProfileComp />
      <R_Sidebar />
    </div>
  );
};

export default UserProfile;
