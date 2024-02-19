import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/WhiteLogo.svg";

function HelloWorld() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/hello-world/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <img src={logo} className="logo" alt="Quizboard logo" />
      <h1>Hello, World!</h1>
      <p>{message}</p>
    </div>
  );
}

export default HelloWorld;
