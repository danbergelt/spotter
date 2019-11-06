import React, { useState } from "react";
import { generateWeek, dashHead } from "../../utils/momentUtils";
import { FiChevronLeft, FiChevronRight, FiPlusCircle } from "react-icons/fi";

const Workouts = () => {
  const [week, setWeek] = useState(0);

  const inc = () => {
    setWeek(week + 1);
  };

  const dec = () => {
    setWeek(week - 1);
  };

  return (
    <div className="week-workouts-container">
      <div className="week-workouts-head">
        <div className="week-workouts-icons">
          <FiChevronLeft data-testid="back" onClick={dec} className="week-workouts-head-icon" />
          <FiChevronRight data-testid="forward" onClick={inc} className="week-workouts-head-icon" />
        </div>
        {dashHead(week)}
      </div>
      <div className="week-workouts-days">
        {generateWeek(week).map((date, i) => (
          <div key={i} className="week-workouts-column">
            <div className="week-workouts-day" key={i}>
              <div className="week-workout-day-slug">{date.format("ddd")}</div>
              <div>{date.format("MMM DD")}</div>
            </div>
            <div className="week-workouts-add-workout">
              {<FiPlusCircle className="week-workouts-add-icon" />} Add Workout
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
