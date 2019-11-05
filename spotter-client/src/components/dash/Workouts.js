import React, { useState } from "react";
import { generateWeek, dashHead } from "../../utils/momentUtils";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Workouts = () => {

  const [week, setWeek] = useState(0);

  const inc = () => {
    setWeek(week + 1);
  }

  const dec = () => {
    setWeek(week - 1)
  }

  return (
    <div className="week-workouts-container">
      <div className="week-workouts-head">
        <div className="week-workouts-icons">
          <FiChevronLeft onClick={dec} className="week-workouts-head-icon" />
          <FiChevronRight onClick={inc} className="week-workouts-head-icon" />
        </div>
        {dashHead()}
      </div>
      <div>
        {generateWeek(week).map((date, i) => (
          <div key={i}>
            <div>{date.format("ddd")}</div>
            <div>{date.format("MMM DD")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
