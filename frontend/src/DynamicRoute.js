import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { logginSuccessful, logout } from "./redux/slices/UserSlice";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import UserProfile from "./pages/profile/UserProfile";

function DynamicRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo.isLoggedIn) {
      dispatch(logginSuccessful(userInfo.user));
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    } else {
      localStorage.removeItem("persist:root");
      localStorage.removeItem("token");
      dispatch(logout());
      if (window.location.pathname !== '/register') {
        navigate('/login');
      }
    }
    // console.log(userInfo)
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/user/:id" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default DynamicRoute;