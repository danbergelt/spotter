import React from "react";
import { FiBookOpen } from 'react-icons/fi';
import { NotesProps as Props } from '../../../../../types/Notes';

const NotesHead: React.FC<Props> = ({ notes, notesRef }) => {

  // focuses the notes when the edit button is clicked
  const handleFocus: () => void = () => {
    if(notesRef?.current){
      notesRef.current.focus()
    }
  }

  return (
    <div className="workout-data-notes-head">
      <FiBookOpen className="workout-data-notes-icon" />
      <div className="workout-data-notes-title">Notes</div>
      {notes !== "" && (
        <div
          className="workout-data-notes-edit"
          onClick={() => handleFocus()}
        >
          Edit
        </div>
      )}
    </div>
  );
};

export default NotesHead;
