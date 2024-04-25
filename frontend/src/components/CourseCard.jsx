import React from "react";
import "../css/CourseCard.css";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="container  my-4 px-5 d-flex flex-wrap gap-10">
      {course.map((course) => (
        <div key={course} className="card  border-0 item">
          <div className="card-body">
            <h6 className="card-title fw-bolder d-flex justify-between">
              <div>COURSE</div>{" "}
              <div>
                <FaEllipsisH className="opacity-50" />
              </div>
            </h6>
            <h3 className="card-text py-2 ">{course}</h3>
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
