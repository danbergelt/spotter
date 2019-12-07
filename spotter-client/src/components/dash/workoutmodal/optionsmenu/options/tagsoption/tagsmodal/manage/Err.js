import React from "react";
import { FiX } from "react-icons/fi";

const Err = ({ err, setErr }) => {
  return (
    <div className="tag-delete-err">
      {err}
      <div
        onClick={() => setErr("")}
        style={{ fontSize: "1.2rem", cursor: "pointer" }}
      >
        <FiX />
      </div>
    </div>
  );
};

export default Err;
