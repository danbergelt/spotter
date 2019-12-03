import React, { useState, useRef } from "react";
import { FiBookOpen, FiPlus, FiTrash } from "react-icons/fi";
import { connect, useSelector } from "react-redux";
import {
  addWorkoutNotes,
  resetNotes
} from "../../../../actions/workoutActions";

const WorkoutNotes = ({ addWorkoutNotes, resetNotes}) => {

  const notes = useSelector(state => state.workoutReducer.notes)

  // i.e. save/delete
  const [actions, setActions] = useState(false);

  const notesRef = useRef(null);

  const editHandler = () => {
    notesRef.current.focus();
  };

  return (
    <div className="workout-data-notes">
      <div className="workout-data-notes-head">
        <FiBookOpen className="workout-data-notes-icon" />
        <div className="workout-data-notes-title">Notes</div>
        {notes !== "" && (
          <div className="workout-data-notes-edit" onClick={editHandler}>
            Edit
          </div>
        )}
      </div>
      <textarea
        ref={notesRef}
        onFocus={() => setActions(true)}
        onBlur={() => setActions(false)}
        value={notes}
        onChange={e => addWorkoutNotes(e.target.value)}
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
        <FiPlus className="workout-data-notes-submit" />
        <FiTrash
          data-testid="trash"
          onMouseDown={() => resetNotes("")}
          className="workout-data-notes-cancel"
        />
      </div>
    </div>
  );
};

export default connect(null, { addWorkoutNotes, resetNotes })(
  WorkoutNotes
);
