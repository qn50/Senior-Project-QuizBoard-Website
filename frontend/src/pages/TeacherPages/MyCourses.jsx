import React from "react";
import { useState, useEffect } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import SearchInput from "../../components/SearchInput.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import SideBar from "../MyCoursesPage/SideBar.jsx";
import "../../css/MyCourses.css";
import api from "../../api";

const MyCourses = () => {
  const [Courses, setCourses] = useState([]);
  const [course_name, setCourse_name] = useState("");
  const [searchText, setSearchText] = useState("");

  const [filteredCourses, setFilteredCourses] = useState([Courses]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    api
      .get("/api/courses/")
      .then((res) => res.data)
      .then((data) => {
        setCourses(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteCourse = (id) => {
    api
      .delete(`/api/courses/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Course deleted!");
        else alert("Failed to delete Course.");
        getCourses();
      })
      .catch((error) => alert(error));
  };

  const createCourse = (e) => {
    e.preventDefault();
    api
      .post("/api/courses/", { course_name })
      .then((res) => {
        if (res.status === 201) alert("Course created!");
        else alert("Failed to make Course.");
        getCourses();
      })
      .catch((err) => alert(err));
  };

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
              <span className="opacity-50 ">({Courses.length})</span>
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
              <form onSubmit={createCourse}>
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
                            name="course_name"
                            id="course_name"
                            onChange={(e) => {
                              setCourse_name(e.target.value);
                            }}
                            value={course_name}
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
                      <button
                        type="submit"
                        className="btn btn-dark btn-custom"
                        data-bs-dismiss="modal"
                      >
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
        {/* <SearchInput onSearch={onSearch} /> */}
        <CourseCard courses={Courses} onDelete={deleteCourse} />
      </div>
    </div>
  );
};

export default MyCourses;
