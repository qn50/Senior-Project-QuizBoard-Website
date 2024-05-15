import { useParams, useLocation } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import SearchInput from "../../components/SearchInput.jsx";
import SideBar from "../../components/SideBar.jsx";
import QuizCard from "../../components/QuizCard.jsx";
import "../../css/MyQuizzes.css";
import api from "../../api";

const MyQuizzes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");

  const [Courses, setCourses] = useState([]);
  const [quizzes, setquizzes] = useState([]);
  const [quize_name, setQuize_name] = useState();
  const [course_id, setcourse_id] = useState();
  const [easyQ, setEasyQ] = useState();
  const [mediumQ, setMediumQ] = useState();
  const [hardQ, setHardQ] = useState();
  const [file, setFile] = useState(null);

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

  const deleteQuiz = (id) => {
    api
      .delete(`/api/quizzes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Quiz deleted!");
        else alert("Failed to delete Quiz.");
        getQuizzes();
      })
      .catch((error) => alert(error));
  };

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
  };

  const generateQuize = (e) => {
    e.preventDefault();
    api
      .post("/api/chatgpt/", { file, easyQ, mediumQ, hardQ })
      .then((res) => {
        if (res.status === 201) alert("Quiz created!");
        else alert("Failed to make Quiz.");
        getQuizzes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="d-flex" style={{ position: "relative", overflowX: "clip" }}>
      <SideBar active={"MyQuizzes"} />
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
                    <div className="input-group mb-2">
                      <span className="input-group-text bg-blue text-white">
                        Quize Name
                      </span>
                      <input
                        type="text"
                        aria-label="First name"
                        className="form-control"
                        required
                        onChange={(e) => {
                          setQuize_name(e.target.value);
                        }}
                      />
                    </div>
                    <select
                      className="form-select mb-4"
                      id="courseSelect"
                      value={course_id}
                      onChange={(e) => setcourse_id(e.target.value)}
                    >
                      <option value="">Select a course</option>
                      {Courses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                          {course.course_name}
                        </option>
                      ))}
                    </select>
                    <div className="input-group mb-2">
                      <span className="input-group-text bg-blue text-white">
                        Easy Questions
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        min={1}
                        max={5}
                        required
                        onChange={(e) => {
                          setEasyQ(e.target.value);
                        }}
                      />
                    </div>
                    <div className="input-group mb-2">
                      <span className="input-group-text bg-blue text-white">
                        Medium Questions
                      </span>

                      <input
                        type="number"
                        className="form-control"
                        min={1}
                        max={5}
                        required
                        onChange={(e) => {
                          setMediumQ(e.target.value);
                        }}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-text bg-blue text-white">
                        {" "}
                        Hard Questions
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        min={1}
                        max={5}
                        required
                        onChange={(e) => {
                          setHardQ(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3 ">
                      <label htmlFor="formFile" className="form-label ">
                        Upload File
                      </label>
                      <input
                        className="form-control "
                        type="file"
                        id="formFile"
                        required
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
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
        <QuizCard Quizzes={quizzes} Courses={Courses} onDelete={deleteQuiz} />
      </div>
    </div>
  );
};
export default MyQuizzes;
