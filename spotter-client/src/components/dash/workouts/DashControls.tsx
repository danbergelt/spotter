import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom'

interface Props {
  inc: () => void;
  dec: () => void;
  time: number;
  month: (num: number) => string
}

// controls incrementing/decrementing the date in view

const DashControls: React.FC<Props> = ({ inc, dec, time, month }) => {
  return (
    <div className="controls-spacer">
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
        <div className="workouts-month-indicator">{month(time)}</div>
      </div>
      <Link to="/prs" className="prs-link">Personal bests</Link>
    </div>
  );
};

export default DashControls;
