import React, { useState } from "react";
import { generateMonth, monthDashHead } from "../../../utils/momentUtils";
import DashControls from "./DashControls";

const WorkoutGrid = () => {
  const [month, setMonth] = useState(0);

  const inc = () => {
    setMonth(month + 1);
  };

  const dec = () => {
    setMonth(month - 1);
  };

  return (
    <>
      <DashControls inc={inc} dec={dec} time={month} month={monthDashHead} />
      <div className="month-workout-days">
        {generateMonth(month).map((date, i) => (
          <div key={i}>{date.format("MMM DD YYYY")}</div>
        ))}
      </div>
    </>
  );
};

export default WorkoutGrid;
