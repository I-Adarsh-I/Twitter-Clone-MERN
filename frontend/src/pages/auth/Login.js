import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="main">
      <div className="container d-flex justify-content-center align-items-center login-main-con">
        <div className="d-flex px-5 py-4 flex-column card gap-4 login-card bg-black">
          <div className="logo-con text-center text-light">Logo</div>
          <div className="btn-grp w-100 d-flex gap-3">
            <button className="btn bg-light p-2 rounded-pill w-50 bg-transparent border border-secondary">
            <img src="./google.png" alt="Google" />
            </button>
            <button className="btn bg-light p-2 rounded-pill w-50 bg-transparent border border-secondary">
            <i className="fa-brands fa-apple fa-xl" style={{color: "#ffffff"}}></i>
            </button>
          </div>
          <div className="d-flex align-itmes-center justify-content-center">
            <hr className="border border-secondary w-50"/>
            <p className="text-secondary m-0 text-center m-1">OR</p>
            <hr className="border border-secondary w-50"/>
          </div>
          <form>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control bg-transparent text-white border-secondary"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput" className="floating-labels text-secondary">
                Email address
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control bg-transparent text-white border-secondary"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword" className="floating-labels text-secondary">
                Password
              </label>
            </div>
            <div className="bot-links d-flex flex-column gap-4 mt-4">
              <button className="btn bg-light p-2 rounded-pill">Login</button>
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
    </div>
  );
}

export default Login;
