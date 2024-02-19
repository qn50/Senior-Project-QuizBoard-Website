import React, { useState, useEffect } from "react";
import "./../css/homePage.css";
import logo from "./../assets/WhiteLogo.svg";
import photo from "./../assets/homePagePhoto.svg";

function HomePage() {
  return (
    <div>
      <header className="homePageHeader">
        <img src={logo} alt="QuizBoard Logo" className="logo" />
        <nav className="navigation">
          <ul className="navLinks">
            <li>
              <a href="#how-it-works">How it works?</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about-us">About us</a>
            </li>
            <li>
              <a href="#login">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-custom btn-custom:hover"
                >
                  Login
                </button>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="home-page">
        <section className="hero-section">
          <div className="text-content">
            <h1>
              Generate your <br />
              balanced quizzes <br />
              with <b>One Click</b>
            </h1>
            <p className="subtitle typing-effect">
              We help you prepare Quizzes and Exams
            </p>
            <a href="#register">
              <button type="button" class="btn btn-primary">
                Get Started
              </button>
            </a>
          </div>
          <div className="image-content">
            <img src={photo} alt="home page image" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
