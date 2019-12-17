import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const ExercisesHead = React.memo(({ setExercisesModal }) => {
  const [add, setAdd] = useState("");

  return (
    <>
      <div className="exercises-header">
        <div className="exercises-title">Save Exercises</div>
        <div
          onClick={() => setExercisesModal(false)}
          className="exercises-exit"
        >
          <FiX
            // inline styles as a convenience
            data-testid="quit-exercises"
            style={{ display: "flex", alignItems: "center" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <input
          autoFocus
          value={add}
          onChange={e => setAdd(e.target.value)}
          placeholder="Add exercise"
          className="exercises-add"
        />
        <div className="btn-exercise">Save</div>
      </div>
    </>
  );
});

export default ExercisesHead;
