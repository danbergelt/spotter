import React from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DashControls = ({ inc, dec, time, month }) => {
  return (
    <div className="workouts-head">
      <div className="workouts-icons">
        <FiChevronLeft
          style={{ fontSize: "2.75rem" }}
          data-testid="back"
          onClick={dec}
          className="workouts-head-icon"
        />
        <FiChevronRight
          style={{ fontSize: "2.75rem" }}
          data-testid="forward"
          onClick={inc}
          className="workouts-head-icon"
        />
      </div>
      {month(time)}
    </div>
  );
};

export default DashControls;
