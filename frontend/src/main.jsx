import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import RegisterPage from "./pages/registerPage.jsx";
// import MyCoursesPage from "./pages/TeacherPages/MyCourses.jsx";
// import MyQuizzesPage from "./pages/TeacherPages/MyQuizzes.jsx";
// import SettingsPage from "./pages/TeacherPages/Settings.jsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/register",
//     element: <RegisterPage />,
//   },
//   {
//     path: "/MyCourses",
//     element: <MyCoursesPage />,
//   },
//   {
//     path: "/MyQuizzes",
//     element: <MyQuizzesPage />,
//   },
//   {
//     path: "/Settings",
//     element: <SettingsPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
