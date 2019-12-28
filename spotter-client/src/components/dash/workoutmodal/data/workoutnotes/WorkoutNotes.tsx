import React, { useState, useRef } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { RESET_NOTES } from "../../../../../actions/workoutActions";
import NotesTextArea from "./NotesTextArea";
import NotesHead from "./NotesHead";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/types/State";

const WorkoutNotes = () => {
  // i.e. save/delete notes
  const [actions, setActions] = useState<boolean>(false);

  const notesRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useDispatch();

  const fetchNotes = (state: State) => state.workoutReducer.notes;

  const notes: string = useSelector(fetchNotes);

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
          onMouseDown={() => dispatch<{type: string, payload: string}>({ type: RESET_NOTES, payload: "" })}
          className="workout-data-notes-cancel"
        />
      </div>
    </div>
  );
};

export default WorkoutNotes;
