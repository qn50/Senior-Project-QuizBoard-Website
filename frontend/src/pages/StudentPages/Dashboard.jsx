import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function Dashboard() {
  const navigate = useNavigate();


  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      navigate("/");    // Redirect to home page
    });
  }



  return (
    <div className="center">
      <form onSubmit={e => submitLogout(e)}>
        <button type="submit" className="btn btn-primary m-top-25">Log out</button>
      </form>
      <h2>You're logged in!</h2>
    </div>
  );
}

export default Dashboard;
