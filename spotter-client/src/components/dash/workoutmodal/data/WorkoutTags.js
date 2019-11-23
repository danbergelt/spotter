import React from "react";

const WorkoutTags = () => {
  return (
    <div className="workout-data-tags">
      <h1 className="workout-data-tags-head">TAGS</h1>
      <div className="workout-data-tags-container">
        {null || <p className="workout-data-tags-head" style={{fontSize: "1.2rem"}}>No tags</p>}
      </div>
    </div>
  );
};

export default WorkoutTags;
