import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from './reducers/index';
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

export default store;
