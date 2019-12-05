import React, { useState, useRef } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { RESET_NOTES } from "../../../../../actions/workoutActions";
import NotesTextArea from "./NotesTextArea";
import NotesHead from "./NotesHead";
import { useDispatch, useSelector } from "react-redux";

const WorkoutNotes = () => {
  // i.e. save/delete notes
  const [actions, setActions] = useState(false);

  const notesRef = useRef(null);

  const dispatch = useDispatch();

  const notes = useSelector(state => state.workoutReducer.notes);

  return (
    <div className="workout-data-notes">
      <NotesHead notes={notes} notesRef={notesRef} />
      <NotesTextArea notesRef={notesRef} setActions={setActions} notes={notes} />
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
          onMouseDown={() => dispatch({ type: RESET_NOTES, payload: "" })}
          className="workout-data-notes-cancel"
        />
      </div>
    </div>
  );
};

export default WorkoutNotes;
