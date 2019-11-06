import React from "react";
import Routes from "../routes";
import Moment from 'moment';
import { extendMoment } from "moment-range";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe("Weekly dash date settings", () => {
  it("can go back in time", () => {
    const moment = extendMoment(Moment);
    localStorage.setItem("token", "token");
    const history = createMemoryHistory();
    const { container, getByText, getByTestId, queryByText } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    history.push("/dashboard");

    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
    expect(container.contains(getByText(moment().startOf('week').format("MMM DD")))).toBeTruthy();

    fireEvent.click(getByTestId(/back/i));

    expect(container.contains(getByText(moment().add(-1, 'weeks').startOf('week').format("MMM DD")))).toBeTruthy();
    expect(container.contains(queryByText(moment().startOf('week').format("MMM DD")))).toBeFalsy();
    expect(container.contains(queryByText(moment().add(-2, 'weeks').startOf('week').format("MMM DD")))).toBeFalsy();
  });

  it("can go forward in time", () => {
    const moment = extendMoment(Moment);
    localStorage.setItem("token", "token");
    const history = createMemoryHistory();
    const { container, getByText, getByTestId, queryByText } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    history.push("/dashboard");

    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
    expect(container.contains(getByText(moment().startOf('week').format("MMM DD")))).toBeTruthy();

    fireEvent.click(getByTestId(/forward/i));

    expect(container.contains(getByText(moment().add(1, 'weeks').startOf('week').format("MMM DD")))).toBeTruthy();
    expect(container.contains(queryByText(moment().startOf('week').format("MMM DD")))).toBeFalsy();
    expect(container.contains(queryByText(moment().add(2, 'weeks').startOf('week').format("MMM DD")))).toBeFalsy();
  })
});
