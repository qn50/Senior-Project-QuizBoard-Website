import React, { useState, useEffect } from "react";
import "./../css/registerPage.css";
import "./../css/homePage.css";
import { Link } from "react-router-dom";
import logo from "./../assets/BlueLogo.svg";
import axios from "axios";
import MyCourses from "./TeacherPages/MyCourses";
import StudentDashboard from "./StudentPages/StudentDashboard";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function RegisterPage() {
  const [registrationError, setRegistrationError] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [role, setRole] = useState("");

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

  function submitRegistration(e) {
    e.preventDefault();
    setRegistrationError("");

    client
      .post("/api/register", {
        first_name: first_name,
        last_name: last_name,
        role: role,
        email: email,
        password: password,
      })
      .then(function (res) {
        client
          .post("/api/login", {
            email: email,
            password: password,
          })
          .then(function (res) {
            setCurrentUser(true);
          });
      })
      .catch(function (error) {
        // Handle registration error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorMessage =
            error.response.data.message ||
            "An error occurred during registration.";
          setRegistrationError(errorMessage);
        } else {
          // The request was made but no response was received or an error occurred in setting up the request
          setRegistrationError("An error occurred during registration.");
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
    <div>
      <header className="Header">
        <Link to="/">
          <img src={logo} alt="QuizBoard Logo" className="logo" />
        </Link>
      </header>
      <div class="container py-5">
        <div class="row ">
          <div class="col-md-5">
            <div class="bg-white p-4 rounded-5 shadow-sm my-5 mx-auto ">
              <h1 class="display-4">
                <b class="darkBlue">Get Started With</b> <b>QuizBoard</b>
              </h1>
              <p class="lead mt-4">Start in minutes !</p>
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
          <div class="col-md-6 mx-auto mt-5">
            <form onSubmit={(e) => submitRegistration(e)}>
              <div class="mb-3">
                <div class="row g-2">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First name"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* 
              <fieldset class="mb-3">
                <legend class="col-form-label pt-0">Your Role</legend>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    id="teacher"
                    value="TEACHER"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label class="form-check-label" for="teacher">
                    Teacher
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    id="student"
                    value="STUDENT"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label class="form-check-label" for="student">
                    Student
                  </label>
                </div>
              </fieldset>*/}
              <div class="d-grid">
                {registrationError && (
                  <div className="alert alert-danger" role="alert">
                    {registrationError}
                  </div>
                )}
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
