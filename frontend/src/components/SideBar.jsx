import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../css/SideBar.css";
import WLogo from "./../assets/WhiteLogo.svg";
import dashBoardIcon from "./../assets/dashBoard.svg";
import magicStickIcon from "./../assets/magicStick.svg";
import settingsIcon from "./../assets/settings.svg";
import logoutIcon from "./../assets/logout.svg";

const SideBar = ({ active }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="sideBar-custom">
      <div className="nav-list">
        <img
          src={WLogo}
          alt="QuizBoard Logo"
          className="logo ResponsiveImage px-3 mb-4"
        />

        <Link
          to="/MyCourses"
          className={
            active === "MyCourses"
              ? "active-link text-decoration-none text-white nav-element"
              : "text-decoration-none text-white nav-element"
          }
        >
          <img src={dashBoardIcon} alt="magi cStick icon" />
          <span className=" fw-bolder m-width">My Courses</span>
        </Link>
        <Link
          to="/MyQuizzes"
          className={
            active === "MyQuizzes"
              ? "active-link text-decoration-none text-white nav-element"
              : "text-decoration-none text-white nav-element"
          }
        >
          <img src={magicStickIcon} alt="magi cStick icon" />
          <span className=" fw-bolder m-width">My Quizzes</span>
        </Link>
        <Link
          to="/Settings"
          className={
            active === "Settings"
              ? "active-link text-decoration-none text-white nav-element"
              : "text-decoration-none text-white nav-element"
          }
        >
          <img src={settingsIcon} alt="magi Stick icon" />
          <span className=" fw-bolder m-width">Settings</span>
        </Link>
      </div>
      <div className="logoutHidecontainer px-3">
        <button type="submit" className="btn btn-light" onClick={handleLogout}>
          <img src={logoutIcon} alt="logout icon" className="logoutIcon" />
          <span className="fw-bolder colorPrimary">Logout</span>
        </button>
        <button className="hidebtn mb-5">
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
