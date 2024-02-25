import React from "react";
import BLogo from "./../assets/BlueLogo.svg";
import "./../css/LoginPage.css";
import { Link } from "react-router-dom";
import loginPhoto from "../assets/LoginPhoto.svg";

const LoginPage = () => {
  return (
    <>
      <header className="Header">
        <Link to="/">
          <img src={BLogo} alt="QuizBoard Logo" className="logo" />
        </Link>
        <div className="navbar-text">
          Don't have an account?
          <Link to="/register" className="text-decoration-none fw-bold ">
            <b> Sign up!</b>
          </Link>
        </div>
      </header>

      <main className="login-page">
        <div className="hero-section">
          <div className="text-content fs-6">
            <h1 className="text-center margin-0">
              <div className="text-center">
                <b>Welcome Back </b>
              </div>
              <div className="fs-4 fw-normal">Login into your account</div>
              <br />
            </h1>
            <form className="form-custom">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control padding-10"
                  id="InputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control padding-10 m-top-10"
                  id="InputPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="form-handel d-flex justify-content-between">
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="Check1"
                  />
                  <label className="form-check-label " for="Check1">
                    Remember me
                  </label>
                </div>
                <div className="forgit">
                  <a href="#ForgotPassword">Forgot password?</a>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary container-fluid m-top-25"
              >
                Login
              </button>
            </form>
          </div>
          <div className=" image-content">
            <img src={loginPhoto} alt="home page image" />
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
