import React from "react";

const NotesTextArea = React.memo(({ notes, onAdd, notesRef, setActions }) => {
  return (
    <textarea
      ref={notesRef}
      onFocus={() => setActions(true)}
      onBlur={() => setActions(false)}
      value={notes}
      onChange={e => onAdd(e.target.value)}
      className="workout-data-notes-content"
      placeholder="Click to enter some notes..."
    />
  );
});

export default NotesTextArea;
