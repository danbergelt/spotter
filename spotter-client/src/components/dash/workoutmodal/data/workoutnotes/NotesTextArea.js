import React from "react";
import { useDispatch } from "react-redux";
import { ADD_WORKOUT_NOTES } from "../../../../../actions/workoutActions";
import TextareaAutosize from "react-textarea-autosize";

const NotesTextArea = ({ notes, notesRef, setActions }) => {
  const dispatch = useDispatch();

  return (
    <TextareaAutosize
      inputRef={notesRef}
      onFocus={() => setActions(true)}
      onBlur={() => setActions(false)}
      value={notes}
      onChange={e =>
        dispatch({ type: ADD_WORKOUT_NOTES, payload: e.target.value })
      }
      className="workout-data-notes-content"
      placeholder="Click to enter some notes..."
    />
  );
};

export default NotesTextArea;
