import React from "react";
import { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import SearchInput from "../../components/SearchInput.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import SideBar from "../MyCoursesPage/SideBar.jsx";
import "../../css/MyCourses.css";

const MyCourses = () => {
  const courses = [
    "CPCS-214",
    "CPCS-222",
    "CPCS-221",
    "CPCS-201",
    "CPCS-202",
    "CPCS-203",
    "CPCS-399",
    "CPCS-310",
    "CPCS-500",
    "CPCS-100",
    "CPCS-200",
    "CPCS-400",
    "CPCS-240",
  ];
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const onSearch = (searchText) => {
    if (searchText === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((item) => {
        return item.toLowerCase().includes(searchText.toLowerCase());
      });
      setFilteredCourses(filtered);
    }
  };

  return (
    <div
      className="d-flex "
      style={{ position: "relative", overflowX: "clip" }}
    >
      <SideBar />
      <div className="flex-grow-1 " style={{ marginLeft: "12rem" }}>
        <div className="container  my-5 px-5 width ">
          <div className="d-flex justify-content-between">
            <p className="fw-bolder mt-1 mb-0 ">
              My Courses
              <span className="opacity-50 ">({filteredCourses.length})</span>
            </p>

            <button
              type="button"
              className="btn btn-dark btn-custom px-4 d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#quizBtnModal"
            >
              <FaRegPlusSquare className="me-2" />
              <span>New Course</span>
            </button>

            <div
              className="modal fade"
              id="quizBtnModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="quizBtnModalLabel"
              aria-hidden="true"
            >
              <form action="">
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title " id="quizBtnModalLabel">
                        Create a Course
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="container">
                        <div className="input-group">
                          <span className="input-group-text btn btn-dark btn-custom bg-blue text-white">
                            Course Name
                          </span>
                          <input
                            type="text"
                            aria-label="First name"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-dark btn-custom">
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="container"></div>
        </div>
        <SearchInput onSearch={onSearch} />
        <CourseCard course={filteredCourses} />
      </div>
    </div>
  );
};

export default MyCourses;
