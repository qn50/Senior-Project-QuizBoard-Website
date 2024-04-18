import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import "./../css/SideBar.css";
import WLogo from "./../assets/WhiteLogo.svg";
import SLogo from "./../assets/shortLogo.svg";
import dashBoardIcon from "./../assets/dashBoard.svg";
import magicStickIcon from "./../assets/magicStick.svg";
import settingsIcon from "./../assets/settings.svg";
import logoutIcon from "./../assets/logout.svg";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function SideBar() {
  const [activeLink, setActiveLink] = useState("My Courses");
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      navigate("/");    // Redirect to home page
    });
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className={`sideBar-custom ${isSidebarOpen ? '' : 'sideBar-hidden'}`}>

      {isSidebarOpen && <img src={WLogo} alt="QuizBoard Logo" className="logo ResponsiveImage" />}
      {!isSidebarOpen && <img src={SLogo} alt="QuizBoard Logo" className="logo hideImage" />}

    
      <div className="nav-list">
        <Link
          to="/MyCourses"
          onClick={() => handleLinkClick("My Courses")}
          className={
            activeLink === "My Courses"
              ? "active-link text-decoration-none text-white nav-element"
              : "text-decoration-none text-white nav-element"
          }
        >
          <img src={dashBoardIcon} alt="magi cStick icon" />
          {isSidebarOpen && <span className=" fw-bolder m-width">My Courses</span>}
        </Link>
        <Link
          to="/MyQuizzes"
          onClick={() => handleLinkClick("My Quizzes")}
          className={
            activeLink === "My Quizzes"
              ? "active-link text-decoration-none text-white nav-element"
              : "text-decoration-none text-white nav-element"
          }
        >
          <img src={magicStickIcon} alt="magi cStick icon" />
          {isSidebarOpen && <span className=" fw-bolder m-width">My Quizzes</span>}
        </Link>
        <Link
          to="/Settings"
          onClick={() => handleLinkClick("Settings")}
          className={
            activeLink === "Settings"
              ? "active-link text-decoration-none text-white nav-element"
              : "text-decoration-none text-white nav-element"
          }
        >
          <img src={settingsIcon} alt="magi cStick icon" />
          {isSidebarOpen && <span className=" fw-bolder m-width">Settings</span>}
        </Link>
      </div>
      <div className="logoutHidecontainer">

        <form onSubmit={e => submitLogout(e)}>
          <button type="submit" className="btn btn-light">
            <img src={logoutIcon} alt="logout icon" className="logoutIcon" />
            {isSidebarOpen && <span className="fw-bolder colorPrimary">Logout</span>}
          </button>
        </form>

        <button className="hidebtn" onClick={toggleSidebar}>
            <FaAngleDoubleLeft className={`hideIcon ${isSidebarOpen ? '' : 'rotateIcon'}`} />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
