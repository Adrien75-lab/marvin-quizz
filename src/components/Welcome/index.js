import React from "react";
import Logout from "../Logout.js";
import Quiz from "../Quiz/index.js";

const Welcome = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz />
      </div>
    </div>
  );
};

export default Welcome;
