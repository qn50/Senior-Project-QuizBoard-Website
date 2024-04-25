import React from "react";
import "../css/CourseMain.css";
import { FaRegPlusSquare } from "react-icons/fa";

const CourseMain = ({ CoursesNum }) => {
  return (
    <div className="container  my-5 px-5">
      <div className="d-flex justify-content-between">
        <p className="fw-bolder mt-1 mb-0">
          My Courses <span className="opacity-50 ">({CoursesNum})</span>
        </p>
        <button
          type="button"
          class="btn btn-dark btn-custom px-4 d-flex align-items-center"
        >
          <FaRegPlusSquare className="me-2" />
          <span>New Course</span>
        </button>
      </div>
      <div className="container"></div>
    </div>
  );
};

export default CourseMain;
