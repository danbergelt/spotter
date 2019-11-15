import React, { useState, useRef } from "react";
import { FiBookOpen, FiCheck, FiTrash } from "react-icons/fi";
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
        <div className="workout-data-notes">
          <div className="workout-data-notes-head">
            <FiBookOpen className="workout-data-notes-icon" />
            <div className="workout-data-notes-title">Notes</div>
            {context.notes !== "" && (
              <div
                className="workout-data-notes-edit"
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
            className="workout-data-notes-content"
            placeholder="Click to enter some notes..."
          />
          <div
            className={
              actions
                ? "workout-data-notes-actions active"
                : "workout-data-notes-actions"
            }
          >
            <FiCheck className="workout-data-notes-submit" />
            <FiTrash
              data-testid="trash"
              onMouseDown={() => context.resetNotes("")}
              className="workout-data-notes-cancel"
            />
          </div>
        </div>
      )}
    </WorkoutDataConsumer>
  );
};

export default WorkoutNotes;
