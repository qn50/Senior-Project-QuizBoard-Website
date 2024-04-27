import React from "react";

import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuizCard = ({ Quizzes }) => {
  return (
    <div className="container  my-4 px-5 d-flex flex-wrap gap-5">
      {Quizzes.map((Quiz) => (
        <div
          key={Quiz}
          className="card  border-0 item"
          style={{ minWidth: "40%", flexGrow: "4" }}
        >
          <div className="card-body">
            <h6 className="card-title fw-bolder d-flex justify-between">
              <div></div> <div className="opacity-50">CREATED: 2023-11-12</div>
              <div>
                <FaEllipsisH className="opacity-50" />
              </div>
            </h6>
            <h3 className="card-text pb-2 pt-3 m-0">{Quiz}</h3>
            <div className="d-flex justify-content-end">
              <button
                className="btn border border-2 px-5"
                style={{ cursor: "context-menu" }}
              >
                CPCS-300
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizCard;
