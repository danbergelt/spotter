import React from "react";
import { FiBookOpen } from 'react-icons/fi';

const NotesHead = ({ notes, notesRef }) => {
  return (
    <div className="workout-data-notes-head">
      <FiBookOpen className="workout-data-notes-icon" />
      <div className="workout-data-notes-title">Notes</div>
      {notes !== "" && (
        <div
          className="workout-data-notes-edit"
          onClick={() => notesRef.current.focus()}
        >
          Edit
        </div>
      )}
    </div>
  );
};

export default NotesHead;
