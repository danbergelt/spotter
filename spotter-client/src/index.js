import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import store from './utils/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("root")
);

export default store;
