import React, { useState, useRef } from "react";
import { FiBookOpen, FiCheck, FiX } from "react-icons/fi";
import { WorkoutDataConsumer } from "../../../../contexts/workoutDataContext";

const WorkoutNotes = () => {
  const [actions, setActions] = useState(false);

  const notesRef = useRef(null);

  const editHandler = () => {
    notesRef.current.focus();
  };

  return (
    <WorkoutDataConsumer>
      {context => (
        <div className="add-workout-data-notes">
          <div className="add-workout-data-notes-head">
            <FiBookOpen className="add-workout-data-notes-icon" />
            <div className="add-workout-data-notes-title">Notes</div>
            {context.notes !== "" && (
              <div
                className="add-workout-data-notes-edit"
                onClick={editHandler}
              >
                Edit
              </div>
            )}
          </div>
          <textarea
            ref={notesRef}
            onFocus={() => setActions(true)}
            onBlur={() => setActions(false)}
            value={context.notes}
            onChange={e => context.setNotes(e.target.value)}
            className="add-workout-data-notes-content"
            placeholder="Enter some notes..."
          />
          <div
            className={
              actions
                ? "add-workout-data-notes-actions active"
                : "add-workout-data-notes-actions"
            }
          >
            <FiCheck className="add-workout-data-notes-submit" />
            <FiX
              onMouseDown={() => context.resetNotes("")}
              className="add-workout-data-notes-cancel"
            />
          </div>
        </div>
      )}
    </WorkoutDataConsumer>
  );
};

export default WorkoutNotes;
