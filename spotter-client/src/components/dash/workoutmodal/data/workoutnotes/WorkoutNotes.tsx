import React, { useState, useRef } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { resetNotesAction } from "../../../../../actions/workoutActions";
import NotesTextArea from "./NotesTextArea";
import NotesHead from "./NotesHead";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/types/State";

const WorkoutNotes = () => {
  // actions include saving, deleting notes
  const [actions, setActions] = useState<boolean>(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const notes: string = useSelector(
    (state: State) => state.workoutReducer.notes
  );
  const dispatch = useDispatch();

  return (
    <div className="workout-data-notes">
      <NotesHead notes={notes} notesRef={notesRef} />
      <NotesTextArea
        notesRef={notesRef}
        setActions={setActions}
        notes={notes}
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
          onMouseDown={() => dispatch(resetNotesAction(""))}
          className="workout-data-notes-cancel"
        />
      </div>
    </div>
  );
};

export default WorkoutNotes;
