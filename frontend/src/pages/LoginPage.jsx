import React, { useState, useEffect } from "react";
import BLogo from "./../assets/BlueLogo.svg";
import "./../css/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import loginPhoto from "../assets/LoginPhoto.svg";
import MyCourses from "./TeacherPages/MyCourses";
//
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/myCourses");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

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
            <form className="form-custom" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control padding-10"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control padding-10 m-top-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-handel d-flex justify-content-between">
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="Check1"
                  />
                  <label className="form-check-label " htmlFor="Check1">
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
}

export default LoginPage;
