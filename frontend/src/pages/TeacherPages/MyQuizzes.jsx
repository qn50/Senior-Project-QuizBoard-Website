import React from "react";
import { useState, useEffect } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import SearchInput from "../../components/SearchInput.jsx";
import SideBar from "../MyCoursesPage/SideBar.jsx";
import QuizCard from "../../components/QuizCard.jsx";
import "../../css/MyQuizzes.css";
import api from "../../api";

const MyQuizzes = () => {
  const courses = [
    "Data Base Q1",
    "ML",
    "AI",
    "Data Base Q2",
    "Data Base Q3",
    "CPCS-203",
    "CPCS-399",
    "CPCS-310",
    "CPCS-500",
    "CPCS-100",
    "CPCS-200",
    "CPCS-400",
    "CPCS-240",
  ];
  const [quizzes, setquizzes] = useState([]);
  const [Quize_name, setQuize_name] = useState([]);
  const [course_id, setcourse_id] = useState([]);

  const [filteredQuizzes, setFilteredQuizzes] = useState(courses);

  useEffect(() => {
    getQuizzes();
  }, []);

  const getQuizzes = () => {
    api
      .get("/api/quizzes/")
      .then((res) => res.data)
      .then((data) => {
        setquizzes(data);
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
      .post("/api/quizzes/", { course_name })
      .then((res) => {
        if (res.status === 201) alert("Quiz created!");
        else alert("Failed to make Quiz.");
        getQuizzes();
      })
      .catch((err) => alert(err));
  };

  const onSearch = (searchText) => {
    if (searchText === "") {
      setFilteredQuizzes(courses);
    } else {
      const filtered = courses.filter((item) => {
        return item.toLowerCase().includes(searchText.toLowerCase());
      });
      setFilteredQuizzes(filtered);
    }
  };

  return (
    <div className="d-flex" style={{ position: "relative", overflowX: "clip" }}>
      <SideBar />
      <div className="flex-grow-1 " style={{ marginLeft: "12rem" }}>
        <div className="container  my-5 px-5 width ">
          <div className="d-flex justify-content-between">
            <p className="fw-bolder mt-1 mb-0 ">
              My Quizzes
              <span className="opacity-50 ">({filteredQuizzes.length})</span>
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
                    <button className="p-2 bg-blue text-white rounded w-100 mb-4">
                      Paste Text or Upload File
                    </button>

                    <div className="container">
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
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label ">
                          Upload File
                        </label>
                        <input
                          className="form-control "
                          type="file"
                          id="formFile"
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
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container"></div>
        </div>
        <SearchInput onSearch={onSearch} />
        <QuizCard Quizzes={filteredQuizzes} />
      </div>
    </div>
  );
};
export default MyQuizzes;
