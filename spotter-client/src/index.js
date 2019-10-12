import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById("root")
);
