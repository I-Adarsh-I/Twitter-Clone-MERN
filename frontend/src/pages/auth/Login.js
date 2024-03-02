import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "alert";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  logginSuccessful,
  loginError,
  loginRequested,
} from "../../redux/slices/UserSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api_key = process.env.REACT_APP_BASE_API;

  const userInfo = useSelector((state) => state.auth);
  // console.log(userInfo)

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const request = {
      email: userInput.email,
      password: userInput.password,
    };
    dispatch(loginRequested());
    try {
      const resp = await axios.post(`${api_key}/login`, request);
      if (resp.status === 200) {
        toast.success(resp.data.message);
        localStorage.setItem("token", resp.data.token.token);
        navigate("/");
        // console.log(resp.data.user.existingUser);
        return dispatch(logginSuccessful(resp.data.user.existingUser));
      } else if (resp.status === 401) {
        dispatch(loginError());
        return toast.error(resp.data.error);
      } else if (resp.status === 404) {
        dispatch(loginError());
        return toast.error(resp.data.error);
      }
    } catch (err) {
      // console.log(err);
      dispatch(loginError());
      toast.error(err.response.data.error);
    }
  };
  return (
    <div className="main">
      <div className="container d-flex justify-content-center align-items-center login-main-con">
        <div className="d-flex px-5 py-4 flex-column card gap-4 login-card bg-black">
          <div className="logo-con-main text-center text-light">
            <img
              src="./DAAK.png"
              alt="DAAK"
              width={"50px"}
              className="logo-sidebar"
            />
          </div>
          <div className="btn-grp w-100 d-flex gap-3">
            <button className="btn bg-light p-2 rounded-pill w-50 bg-transparent border border-secondary">
              <img src="./google.png" alt="Google" />
            </button>
            <button className="btn bg-light p-2 rounded-pill w-50 bg-transparent border border-secondary">
              <i
                className="fa-brands fa-apple fa-xl"
                style={{ color: "#ffffff" }}
              ></i>
            </button>
          </div>
          <div className="d-flex align-itmes-center justify-content-center">
            <hr className="border border-secondary w-50" />
            <p className="text-secondary m-0 text-center m-1">OR</p>
            <hr className="border border-secondary w-50" />
          </div>
          <form onSubmit={loginHandler}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control bg-transparent text-white border-secondary"
                id="floatingInput"
                name="email"
                placeholder="name@example.com"
                value={userInput.email}
                onChange={onChangeHandler}
              />
              <label
                htmlFor="floatingInput"
                className="floating-labels text-secondary"
              >
                Email address
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control bg-transparent text-white border-secondary"
                id="floatingPassword"
                name="password"
                placeholder="Password"
                value={userInput.password}
                onChange={onChangeHandler}
              />
              <label
                htmlFor="floatingPassword"
                className="floating-labels text-secondary"
              >
                Password
              </label>
            </div>
            <div className="bot-links d-flex flex-column gap-4 mt-4">
              <button
                className="btn bg-light p-2 rounded-pill"
                type="submit"
                onClick={loginHandler}
              >
                Login
                {userInfo.isLoading && (
                  <div
                    className="spinner-border text-primary spinner-border-sm ms-1"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
              <button className="btn bg-transparent text-white border p-2 rounded-pill border-secondary">
                Forgot password?
              </button>
              <p className="text-secondary mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-decoration-none">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Login;
