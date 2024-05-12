import React from "react";

import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuizCard = ({ Quizzes, Courses, onDelete }) => {
  const getCourseName = (quizID) => {
    const course = Courses.find((course) => course.course_id === quizID);
    if (course) {
      return course.course_name;
    }
    return "";
  };

  return (
    <div className="container  my-4 px-5 d-flex flex-wrap gap-5">
      {Quizzes.map((Quiz) => (
        <div
          key={Quiz.quize_id}
          className="card  border-0 item"
          style={{ minWidth: "40%", flexGrow: "4" }}
        >
          <div className="card-body">
            <h6 className="card-title fw-bolder d-flex justify-between">
              <div>QUIZ</div>{" "}
              <div className="opacity-50">CREATED: 2023-11-12</div>
              <div className="btn-group dropup">
                <FaEllipsisH
                  className="opacity-50"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul className="dropdown-menu bg-danger ">
                  <li>
                    <a
                      type="button"
                      className="dropdown-item bg-danger"
                      onClick={() => {
                        onDelete(Quiz.quize_id);
                      }}
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </h6>
            <h3 className="card-text pb-2 pt-3 m-0">{Quiz.quize_name}</h3>
            <div className="d-flex justify-content-end">
              <button
                className="btn border border-2 px-5"
                style={{ cursor: "context-menu" }}
              >
                {getCourseName(Quiz.course_id)}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizCard;
