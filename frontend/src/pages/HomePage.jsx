import React from "react";
import "./../css/homePage.css";
import Wlogo from "./../assets/WhiteLogo.svg";
import photo from "./../assets/homePagePhoto.svg";
import { Link } from "react-router-dom";

function HomePage() {

  return (
    <div>
      <header className="homePageHeader">
      <Link to="/"><img src={Wlogo} alt="QuizBoard Logo" className="logo" /></Link>
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
              <Link to="/login">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-custom btn-custom:hover"
                >
                  Login
                </button>
              </Link>
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
            <Link to="/register">
              <button type="button" class="btn btn-primary">
                Get Started
              </button>
            </Link>
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
