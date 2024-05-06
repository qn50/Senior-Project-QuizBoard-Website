import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import SearchInput from "../../components/SearchInput.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import SideBar from "../MyCoursesPage/SideBar.jsx";
import "../../css/MyCourses.css";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const MyCourses = () => {
  const tempcourses = [];
  const [Courses, setCourses] = useState([]);

  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    client
      .get("/api/courses")
      .then((res) => {
        res.data.map((course) => {
          tempcourses[course.course_id - 1] = course.course_name;
        });
        setCourses(tempcourses);
        setFilteredCourses(tempcourses);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onSearch = (searchText) => {
    if (searchText === "") {
      setFilteredCourses(Courses);
    } else {
      const filtered = Courses.filter((item) => {
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
              tabIndex="-1"
              aria-labelledby="quizBtnModalLabel"
              aria-hidden="true"
            >
              <form
                action="http://127.0.0.1:8000/api/courses/create"
                method="POST"
              >
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
                            name="courseName"
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
                      <button type="submit" className="btn btn-dark btn-custom">
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
