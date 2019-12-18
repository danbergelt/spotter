import React from "react";
import { FiX } from "react-icons/fi";

// displays err on bad API req, success on good API req

const SaveExerciseMsg = ({ errOrSucc, setMsg, msg }) => {
  return (
    <div className={errOrSucc}>
      {msg}
      <div
        onClick={() => setMsg("")}
        style={{ fontSize: "1.2rem", cursor: "pointer" }}
      >
        <FiX />
      </div>
    </div>
  );
};

export default SaveExerciseMsg;
