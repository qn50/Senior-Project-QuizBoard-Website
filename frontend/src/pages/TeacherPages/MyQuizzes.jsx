import React from "react";
import { useState } from "react";
import CourseMain from "../../components/CourseMain.jsx";
import SearchInput from "../../components/SearchInput.jsx";
import SideBar from "../MyCoursesPage/SideBar.jsx";
import QuizCard from "../../components/QuizCard.jsx";

const MyQuizzes = () => {
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
    <div className="d-flex ">
      <SideBar />
      <div className="w-100 flex-grow-1">
        <CourseMain CoursesNum={filteredCourses.length} pageTitle={"Quiz"} />
        <SearchInput onSearch={onSearch} />
        <QuizCard Quizzes={filteredCourses} />
      </div>
    </div>
  );
};
export default MyQuizzes;
