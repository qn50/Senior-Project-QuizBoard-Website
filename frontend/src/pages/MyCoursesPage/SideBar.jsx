import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import "./../../css/SideBar.css";
import WLogo from "../../assets/WhiteLogo.svg";
import dashBoardIcon from "../../assets/dashBoard.svg";
import magicStickIcon from "../../assets/magicStick.svg";
import settingsIcon from "../../assets/settings.svg";
import logoutIcon from "../../assets/logout.svg";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState("My Courses");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="sideBar-custom">
      <img src={WLogo} alt="QuizBoard Logo" className="logo ResponsiveImage" />
      <div className="nav-list">
        <Link
          to=""
          onClick={() => handleLinkClick("My Courses")}
          className={
            activeLink === "My Courses"
              ? "active-link text-decoration-none text-white nav-element"
              : "text-decoration-none text-white nav-element"
          }
        >
          <img src={dashBoardIcon} alt="magi cStick icon" />
          <span className=" fw-bolder m-width">My Courses</span>
        </Link>
        <Link
          to=""
          onClick={() => handleLinkClick("My Quizzes")}
          className={
            activeLink === "My Quizzes"
              ? "active-link text-decoration-none text-white nav-element"
              : "text-decoration-none text-white nav-element"
          }
        >
          <img src={magicStickIcon} alt="magi cStick icon" />
          <span className=" fw-bolder m-width">My Quizzes</span>
        </Link>
        <Link
          to=""
          onClick={() => handleLinkClick("Settings")}
          className={
            activeLink === "Settings"
              ? "active-link text-decoration-none text-white nav-element"
              : "text-decoration-none text-white nav-element"
          }
        >
          <img src={settingsIcon} alt="magi cStick icon" />
          <span className=" fw-bolder m-width">Settings</span>
        </Link>
      </div>
      <div className="logoutHidecontainer">
        <button type="submit" className="btn btn-light">
          <img src={logoutIcon} alt="logout icon" className="logoutIcon" />
          <span className="fw-bolder colorPrimary">Logout</span>
        </button>
        <button className="hidebtn">
          <FaAngleDoubleLeft className="hideIcon" />
          <span>Hide</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
