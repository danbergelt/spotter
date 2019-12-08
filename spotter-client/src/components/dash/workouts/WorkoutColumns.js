import React, { useState, useEffect } from "react";
import WorkoutColumn from "./WorkoutColumn";
import { generateWeek, dashHead } from "../../../utils/momentUtils";
import DashControls from './DashControls';
import { useHistory } from "react-router-dom";
import reFetch from "../../../utils/reFetch";

const WorkoutColumns = () => {
  const history = useHistory();

  const [week, setWeek] = useState(0);

  const inc = () => {
    setWeek(week + 1);
  };

  const dec = () => {
    setWeek(week - 1);
  };

  // refetches data upon dashboard state change
  useEffect(() => {
    reFetch(week, history);
  }, [week, history]);

  return (
    <>
      <DashControls inc={inc} dec={dec} time={week} month={dashHead}/>
      <div className="week-workouts-days">
        {generateWeek(week).map((date, i) => (
          <WorkoutColumn date={date} key={i} i={i} week={week} />
        ))}
      </div>
    </>
  );
};

export default WorkoutColumns;
