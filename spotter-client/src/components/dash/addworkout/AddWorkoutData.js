import React, { useState } from "react";
import { FiPlus, FiBookOpen, FiCheck, FiX } from "react-icons/fi";

const AddWorkoutData = () => {
  const [actions, setActions] = useState(false);
  const [notes, setNotes] = useState("");

  const notesHandler = e => {
    setNotes(e.target.value);
  };

  const resetNotes = () => {
    setNotes("");
  };

  return (
    <div className="add-workout-data">
      <div className="add-workout-data-tags">
        <h1 className="add-workout-data-tags-head">TAGS</h1>
        <div className="add-workout-data-tags-container">
          <div className="add-workout-data-tags-tag">FOO</div>
          <div className="add-workout-data-tags-tag add">{<FiPlus />}</div>
        </div>
      </div>
      <div className="add-workout-data-notes">
        <div className="add-workout-data-notes-head">
          <FiBookOpen className="add-workout-data-notes-icon" />
          Notes
        </div>
        <textarea
          onFocus={() => setActions(true)}
          onBlur={() => setActions(false)}
          value={notes}
          onChange={notesHandler}
          className="add-workout-data-notes-content"
          placeholder="Enter some notes..."
        />
        <div
          className={
            actions
              ? "add-workout-data-notes-actions active"
              : "add-workout-data-notes-actions"
          }
        >
          <FiCheck className="add-workout-data-notes-submit" />
          <FiX onMouseDown={resetNotes} className="add-workout-data-notes-cancel" />
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutData;
