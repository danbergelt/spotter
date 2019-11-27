import React from "react";

import SubNav from "../components/dash/subnav/SubNav";
import WorkoutColumns from "../components/dash/workouts/WorkoutColumns";

const Dashboard = () => {
  return (
    <>
      <SubNav />
      <WorkoutColumns />
    </>
  );
};

export default Dashboard;
