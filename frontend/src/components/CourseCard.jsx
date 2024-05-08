import React from "react";
import "../css/CourseCard.css";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";

const CourseCard = ({ courses, onDelete }) => {
  return (
    <div className="container  my-4 px-5 d-flex flex-wrap gap-10">
      {courses.map((course, index) => (
        <div key={course.course_id} className="card  border-0 item">
          <div className="card-body">
            <h6 className="card-title fw-bolder d-flex justify-between">
              <div>COURSE</div>{" "}
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
                        onDelete(course.course_id);
                      }}
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </h6>
            <h3 className="card-text py-2 ">{course.course_name}</h3>
            <Link to="/" className=" link-dark fw-bolder">
              View All Quizzes
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
