import React, { useState, useRef } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { resetNotesAction } from "../../../../../actions/workoutActions";
import NotesTextArea from "./NotesTextArea";
import NotesHead from "./NotesHead";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/types/State";

// misc. notes to include on a workout.
// can be anything worth noting that doesn't fit into a specific category

const WorkoutNotes = () => {
  // actions include saving, deleting notes
  const [actions, setActions] = useState<boolean>(false);

  // ref for focusing on-demand
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
        <FiPlus role="button" className="workout-data-notes-submit" />
        <FiTrash
          role="button"
          data-testid="trash"
          onMouseDown={() => dispatch(resetNotesAction(""))}
          className="workout-data-notes-cancel"
        />
      </div>
    </div>
  );
};

export default WorkoutNotes;
