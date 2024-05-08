import React, { useState, useEffect } from "react";
import "./../css/registerPage.css";
import "./../css/homePage.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/BlueLogo.svg";
import axios from "axios";
import MyCourses from "./TeacherPages/MyCourses";
//
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("api/user/register/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/login");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="Header">
        <Link to="/">
          <img src={logo} alt="QuizBoard Logo" className="logo" />
        </Link>
      </header>
      <div className="container py-5">
        <div className="row ">
          <div className="col-md-5">
            <div className="bg-white p-4 rounded-5 shadow-sm my-5 mx-auto ">
              <h1 className="display-4">
                <b className="darkBlue">Get Started With</b> <b>QuizBoard</b>
              </h1>
              <p className="lead mt-4">Start in minutes !</p>
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
          <div className="col-md-6 mx-auto mt-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="row g-2"></div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <p class="text-secondary mt-3">
                <small>
                  By continuing you indicate that you've read and agreed to the
                  Terms of Use
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
