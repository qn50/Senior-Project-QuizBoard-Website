import React from "react";
import "./../css/registerPage.css";
import "./../css/homePage.css";
import { Link } from 'react-router-dom';
import logo from "./../assets/BlueLogo.svg";

const RegisterPage = () => {
  return (
    <div>
      <header className="Header">
      <Link to="/"><img src={logo} alt="QuizBoard Logo" className="logo" /></Link>
      </header>
      <div class="container py-5">
        <div class="row ">
          <div class="col-md-5">
          <div class="bg-white p-4 rounded-5 shadow-sm my-5 mx-auto ">
            <h1 class="display-4"><b class="darkBlue">Get Started With</b> <b>QuizBoard</b></h1>
            <p class="lead mt-4">Start in minutes !</p>
            <p>
              Already have an account?{" "}
              <Link to="/login">
                Log in
              </Link>
            </p>
            </div>
          </div>
          <div class="col-md-6 mx-auto mt-5">
            <form>
              <div class="mb-3">
                <div class="row g-2">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <input type="email" class="form-control" placeholder="Email" />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <fieldset class="mb-3">
                <legend class="col-form-label pt-0">Your Role</legend>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    id="teacher"
                    value="teacher"
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
                    value="student"
                    checked
                  />
                  <label class="form-check-label" for="student">
                    Student
                  </label>
                </div>
              </fieldset>
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
};

export default RegisterPage;
