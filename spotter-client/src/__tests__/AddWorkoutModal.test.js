import React from "react";
import Workouts from "../components/dash/workouts/Workouts";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, cleanup, fireEvent } from "@testing-library/react";
import secureStorage from "../utils/secureToken";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "../reducers/index";
import Modal from "react-modal";

// initial setup
afterEach(cleanup);
secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "token");
const store = createStore(reducer, applyMiddleware(thunk));
Modal.setAppElement(document.createElement("div"));

describe("add workout modal functionality", () => {
  it("open and close modal functionality", () => {
    // suppresses warning for rendering document.body directly in render function
    console.error = jest.fn();
    const history = createMemoryHistory();
    const { queryByPlaceholderText, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Workouts />
        </Router>
      </Provider>,
      { container: document.body }
    );

    fireEvent.click(getByTestId(/modal-click/i));

    expect(queryByPlaceholderText(/e.g. squat/i)).toBeTruthy();
    expect(queryByTestId(/exit-modal/i)).toBeTruthy();

    fireEvent.click(getByTestId(/exit-modal/i));

    expect(queryByTestId(/exit-modal/i)).toBeFalsy();
    expect(queryByPlaceholderText(/e.g. squat/i)).toBeFalsy();
  });
});
