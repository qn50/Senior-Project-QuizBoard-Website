import React, { useState, useEffect } from "react";
import BLogo from "./../assets/BlueLogo.svg";
import "./../css/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import loginPhoto from "../assets/LoginPhoto.svg";
import axios from "axios";
import MyCourses from "./TeacherPages/MyCourses";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function LoginPage() {
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    client
      .get("/api/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function submitLogin(e) {
    e.preventDefault();
    setLoginError("");

    client
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        setCurrentUser(true);
        navigate("/MyCourses");
      })
      .catch(function (error) {
        // Handle error here.
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorMessage =
            error.response.data.message || "Invalid email or password";
          setLoginError(errorMessage);
        } else if (error.request) {
          // The request was made but no response was received
          setLoginError("The request was made but no response was received");
        } else {
          // Something happened in setting up the request that triggered an Error
          setLoginError("Error in setting up the request");
        }
      });
  }

  if (currentUser) {
    return (
      <div>
        <MyCourses />
      </div>
    );
  }

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
            <form className="form-custom" onSubmit={(e) => submitLogin(e)}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control padding-10"
                  id="InputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control padding-10 m-top-10"
                  id="InputPassword1"
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
                  <label className="form-check-label " for="Check1">
                    Remember me
                  </label>
                </div>
                <div className="forgit">
                  <a href="#ForgotPassword">Forgot password?</a>
                </div>
              </div>

              {loginError && (
                <div className="alert alert-danger" role="alert">
                  {loginError}
                </div>
              )}
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
