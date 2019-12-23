import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { reducer } from "./reducers/index";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

export default store;
