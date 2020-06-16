import React from "react";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="row small-up-2">
      <div className="medium-6 columns">
        <h1>Program Planner </h1>
        <h3> Software for everyone! </h3>
        <br />
        <a href="#" className="button large">
          SignUp
        </a>
        <a href="#" className="button large hollow">
          Login
        </a>
      </div>
      <div className="medium-6 columns">
        <img className="thumbnail" src="https://placehold.it/550x550" />
      </div>
    </div>
  );
}

export default Welcome;
