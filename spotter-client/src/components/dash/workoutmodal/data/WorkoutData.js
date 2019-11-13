import React from "react";

// sub-components
import WorkoutTags from './WorkoutTags';
import WorkoutNotes from './WorkoutNotes';
import WorkoutExercises from './WorkoutExercises';

const WorkoutData = () => {

  return (
    <div className="workout-data">
      <WorkoutTags />
      <WorkoutNotes />
      <WorkoutExercises />
    </div>
  );
};

export default WorkoutData;
