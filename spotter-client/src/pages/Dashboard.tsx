import React from "react";

import SubNav from "../components/dash/subnav/SubNav";
import WorkoutColumns from "../components/dash/workouts/week/WorkoutColumns";
import WorkoutGrid from "../components/dash/workouts/month/WorkoutGrid";
import { useSelector } from "react-redux";
import { State } from "src/types/State";

const Dashboard: React.FC = () => {
  const fetchScope = (state: State) => state.globalReducer.scope;

  const scope: { value: string; label: string } = useSelector(fetchScope);

  return (
    <>
      <SubNav />
      {scope.value === "Week" && <WorkoutColumns />}
      {scope.value === "Month" && <WorkoutGrid />}
    </>
  );
};

export default Dashboard;