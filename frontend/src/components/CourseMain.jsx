import React from "react";
import "../css/CourseMain.css";
import { FaRegPlusSquare } from "react-icons/fa";

const printPageTitle = (pageTitle) => {
  pageTitle === "Course" ? (pageTitle = "Courses") : (pageTitle = "Quizzes");
  return pageTitle;
};

const CourseMain = ({ CoursesNum, pageTitle }) => {
  return (
    <div className="container  my-5 px-5 ">
      <div className="d-flex justify-content-between">
        <p className="fw-bolder mt-1 mb-0 ">
          My {printPageTitle(pageTitle)}
          <span className="opacity-50 ">({CoursesNum})</span>
        </p>

        <button
          type="button"
          class="btn btn-dark btn-custom px-4 d-flex align-items-center"
        >
          <FaRegPlusSquare className="me-2" />
          <span>New {pageTitle}</span>
        </button>
      </div>
      <div className="container"></div>
    </div>
  );
};

export default CourseMain;
