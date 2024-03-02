import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "alert";
import axios from "axios";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const api_key = process.env.REACT_APP_BASE_API;

  const [userInput, setUserInput] = useState({
    name: "",
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

  const signUpHandler = async (e) => {
    e.preventDefault();

    const request = {
      fullname: userInput.name,
      email: userInput.email,
      password: userInput.password,
    };
    setIsLoading(true);
    try {
      const resp = await axios.post(`${api_key}/signup`, request);
      if (resp.status === 200) {
        setIsLoading(false);
        navigate("/login");
        return toast.success(resp.data.message);
      } else if (resp.status === 404) {
        setIsLoading(false);
        return toast.error(resp.data.error);
      }
      console.log(resp);
    } catch (err) {
      setIsLoading(false);
      console.log(err.response.data);
      return toast.error(err.response.data.message);
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
          <form onSubmit={signUpHandler}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control bg-transparent text-white border-secondary"
                id="floatingInput"
                placeholder="John Doe"
                name="name"
                value={userInput.name}
                onChange={onChangeHandler}
              />
              <label
                htmlFor="floatingInput"
                className="floating-labels text-secondary"
              >
                Full name
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control bg-transparent text-white border-secondary"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
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
                placeholder="Password"
                name="password"
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
                onClick={signUpHandler}
              >
                Register{" "}
                {isLoading && (
                  <div
                    className="spinner-border text-primary spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>

              <p className="text-secondary mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Login
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
