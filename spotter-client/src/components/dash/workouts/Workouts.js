import React, { useState, useEffect } from "react";
import WorkoutColumn from "./WorkoutColumn";
import { generateWeek, dashHead } from "../../../utils/momentUtils"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Workouts = () => {
  const [week, setWeek] = useState(0);

  const inc = () => {
    setWeek(week + 1);
  };

  const dec = () => {
    setWeek(week - 1);
  };

  useEffect(() => {
    // let range = generateWeek(week);
    // range = week.map(d => d.format("MMM"));
    // generateWeek(range);
    console.log("changed")
  }, [week])

  return (
    <div className="week-workouts-container">
      <div className="week-workouts-head">
        <div className="week-workouts-icons">
          <FiChevronLeft
            data-testid="back"
            onClick={dec}
            className="week-workouts-head-icon"
          />
          <FiChevronRight
            data-testid="forward"
            onClick={inc}
            className="week-workouts-head-icon"
          />
        </div>
        {dashHead(week)}
      </div>
      <div className="week-workouts-days">
        {generateWeek(week).map((date, i) => (
          <WorkoutColumn date={date} key={i} i={i} />
        ))}
      </div>
    </div>
  );
};

export default Workouts;
