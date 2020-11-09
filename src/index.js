import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootswatch/dist/superhero/bootstrap.min.css"; // Added this :boom:

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
