import React from "react";
import { FiX } from "react-icons/fi";

  // displays err on bad API req, success on good API req

const SaveTemplateMsg = ({ errOrSucc, setMessage, message }) => {

  return (
    <div className={errOrSucc}>
      {message}
      <div
        onClick={() => setMessage("")}
        style={{ fontSize: "1.2rem", cursor: "pointer" }}
      >
        <FiX />
      </div>
    </div>
  );
};

export default SaveTemplateMsg;
