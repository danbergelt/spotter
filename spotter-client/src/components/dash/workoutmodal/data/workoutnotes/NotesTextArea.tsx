import React from "react";
import { useDispatch } from "react-redux";
import { addNotesAction } from "../../../../../actions/workoutActions";
import TextareaAutosize from "react-textarea-autosize";
import { NotesProps } from "../../../../../types/Notes";

interface Props extends NotesProps {
  setActions: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotesTextArea: React.FC<Props> = ({ notes, notesRef, setActions }) => {
  const dispatch = useDispatch();

  return (
    <TextareaAutosize
      inputRef={notesRef}
      onFocus={() => setActions(true)}
      onBlur={() => setActions(false)}
      value={notes}
      onChange={e => dispatch(addNotesAction(e.target.value))}
      className="workout-data-notes-content"
      placeholder="Click to enter some notes..."
    />
  );
};

export default NotesTextArea;
