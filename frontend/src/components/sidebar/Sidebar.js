import "./sidebar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const imgUrl =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  const userInfo = useSelector((state) => state.auth.user);
  const navigate = useNavigate(); // Initialize useNavigate

  axios.defaults.withCredentials = true;

  // Function to navigate to profile
  const goToProfile = () => {
    navigate("/profile"); // Navigate to profile route
  };

  // Function to navigate back to home
  const goToHome = () => {
    navigate("/"); // Navigate to home route
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("persist:root");
    navigate("/login");
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-between border-end border-dark-subtle p-2 sidebar-main gap-4 px-2">
        <div className="top-options">
          <div className="logo-container d-flex align-items-center justify-content-start">
            <img src="./DAAK.png" alt="DAAK" width={'50px'} className="logo-sidebar"/>
          </div>
          <div className="content d-flex flex-column gap-3 mt-4">
            <div
              className="option d-flex align-items-center gap-4 rounded-pill px-3 py-3 pe-4"
              role="button"
              onClick={goToHome}
            >
              <div className="logo-con d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-house fa-xl"></i>
              </div>
              <div className="head-con">
                <h5 className="m-0 nav-item">Home</h5>
              </div>
            </div>
            <div
              className="option d-flex align-items-center gap-4 rounded-pill px-3 py-3 pe-4"
              role="button"
              onClick={goToProfile}
            >
              <div className="logo-con d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-user fa-xl"></i>
              </div>
              <div className="head-con">
                <h5 className="m-0 nav-item">Profile</h5>
              </div>
            </div>
            <div
              className="option d-flex align-items-center gap-4 rounded-pill px-3 py-3 pe-4"
              role="button"
              onClick={logOut}
            >
              <div className="logo-con d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-right-from-bracket fa-xl"></i>
              </div>
              <div className="head-con">
                <h5 className="m-0 nav-item">Logout</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-transparent profile-card text-white" role="button" onClick={() => navigate('/profile')}>
          <div className="card-body d-flex justify-content-between align-items-center gap-2 py-2">
            <div className="name-n-avatar d-flex align-items-center gap-3">
              <div className="avatar rounded-pill overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                  alt="profile"
                  className="w-100 "
                />
              </div>
              <div className="name-sec">
                <h5 className="m-0">{userInfo.fullname}</h5>
                {userInfo.username ? (
                  <p className="text-white-50 m-0">@{userInfo.username}</p>
                ) : (
                  <p className="text-white-50 m-0">@{userInfo.fullname}</p>
                )}
              </div>
            </div>
            <div
              className="more-options rounded-pill align-items-center justify-content-center m-0"
              role="button"
            >
              <i className="fa-solid fa-ellipsis fa-lg"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
