import { useParams, useLocation } from 'react-router-dom';
import React from "react";
import { useState, useEffect } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import SearchInput from "../../components/SearchInput.jsx";
import SideBar from "../MyCoursesPage/SideBar.jsx";
import QuizCard from "../../components/QuizCard.jsx";
import "../../css/MyQuizzes.css";
import api from "../../api";

const MyQuizzes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('id');
  
  const [Courses, setCourses] = useState([]);
  const [quizzes, setquizzes] = useState([]);
  const [quize_name, setQuize_name] = useState();
  const [course_id, setcourse_id] = useState();

  const [filteredQuizzes, setFilteredQuizzes] = useState([quizzes]);

  useEffect(() => {
    getQuizzes();
    getCourses();
  }, []);

  const getQuizzes = () => {
    api
      .get(`/api/quizzes/?course_id=${courseId}`)
      .then((res) => res.data)
      .then((data) => {
        setquizzes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

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

  // const deleteQuiz = (id) => {
  //   api
  //     .delete(`/api/quizzes/delete/${id}/`)
  //     .then((res) => {
  //       if (res.status === 204) alert("Quiz deleted!");
  //       else alert("Failed to delete Quiz.");
  //       getQuizzes();
  //     })
  //     .catch((error) => alert(error));
  // };

  const createQuize = (e) => {
    e.preventDefault();
    api
      .post("/api/quizzes/", { quize_name, course_id })
      .then((res) => {
        if (res.status === 201) alert("Quiz created!");
        else alert("Failed to make Quiz.");
        getQuizzes();
      })
      .catch((err) => alert(err));
    // console.log({courseId,quize_name})TRUE
  };

  // const onSearch = (searchText) => {
  //   if (searchText === "") {
  //     setFilteredQuizzes(quizzes);
  //   } else {
  //     const filtered = quizzes.filter((item) => {
  //       return item.toLowerCase().includes(searchText.toLowerCase());
  //     });
  //     setFilteredQuizzes(filtered);
  //   }
  // };

  return (
    <div className="d-flex" style={{ position: "relative", overflowX: "clip" }}>
      <SideBar />
      <div className="flex-grow-1 " style={{ marginLeft: "12rem" }}>
        <div className="container  my-5 px-5 width ">
          <div className="d-flex justify-content-between">
            <p className="fw-bolder mt-1 mb-0 ">
              My Quizzes
              <span className="opacity-50 ">({quizzes.length})</span>
            </p>

            <button
              type="button"
              className="btn btn-dark btn-custom px-4 d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#quizBtnModal"
            >
              <FaRegPlusSquare className="me-2" />
              <span>New Quiz</span>
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
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="quizBtnModalLabel">
                      Generate Quize Questions
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body">
                    <span className="input-group-text btn btn-dark btn-custom bg-blue text-white mb-2">
                      Quiz Name
                    </span>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control"
                      name="quiz_name"
                      id="quiz_name"
                      onChange={(e) => {
                        setQuize_name(e.target.value);
                      }}
                      value={quize_name}
                      required
                    />

                    <div className="container">
                      <label htmlFor="courseSelect" className="form-label">
                        Select Course
                      </label>
                      <select
                        className="form-select"
                        id="courseSelect"
                        value={course_id}
                        onChange={(e) => setcourse_id(e.target.value)}
                        required
                      >
                        <option value="">Select a course</option>
                        {Courses.map((course) => (
                          <option
                            key={course.course_id}
                            value={course.course_id}
                          >
                            {course.course_name}
                          </option>
                        ))}
                      </select>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Quize Content
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                      <p className="text-center">--- OR ---</p>
                      {/* <div className="mb-3">
                        <label htmlFor="formFile" className="form-label ">
                          Upload File
                        </label>
                        <input
                          className="form-control "
                          type="file"
                          id="formFile"
                        />
                      </div> */}
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
                      type="button"
                      className="btn btn-dark btn-custom"
                      onClick={createQuize}
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container"></div>
        </div>
        {/* <SearchInput onSearch={onSearch} /> */}
        <QuizCard Quizzes={quizzes} Courses={Courses} />
      </div>
    </div>
  );
};
export default MyQuizzes;
