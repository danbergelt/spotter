import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const ExercisesHead = React.memo(({ setExercisesModal, tab, setTab }) => {
  return (
    <>
      <div className="exercises-header">
        <div
          style={{
            display: "flex",
            width: "55%",
            justifyContent: "space-between"
          }}
        >
          <div
            onClick={() => setTab(0)}
            className={
              tab === 0 ? "exercises-title" : "exercises-title-not-active"
            }
          >
            Manage
          </div>
          <div
            onClick={() => setTab(1)}
            className={
              tab === 1 ? "exercises-title" : "exercises-title-not-active"
            }
          >
            Create
          </div>
        </div>
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
    </>
  );
});

export default ExercisesHead;
