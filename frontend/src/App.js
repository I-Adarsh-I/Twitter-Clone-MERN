import "./App.css";
import React from "react";
// <<<<<<< dynamic-route
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Register from './pages/auth/Register';
// import Home from "./pages/home/Home";
// import Profile from './pages/profile/Profile'
import DynamicRoute from "./DynamicRoute";
// =======
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Register from './pages/auth/Register';
// import Home from "./pages/home/Home";
// import Profile from './pages/profile/Profile'
// import UserProfile from "./pages/profile/UserProfile";
// >>>>>>> main

function App() {
  return (
    <div className="App">
      <DynamicRoute />
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element = {<Home />} />
        <Route path="/profile" element={<Profile />} />
//         <Route path="/profile/user/:id" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
