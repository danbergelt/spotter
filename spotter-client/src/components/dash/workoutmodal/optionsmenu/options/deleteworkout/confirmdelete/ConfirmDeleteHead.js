import React from "react";
import { FiX } from "react-icons/fi";

const ConfirmDeleteHead = React.memo(({ close }) => {
  return (
    <div className="delete-head-container">
      <div className="delete-head">Delete Workout</div>
      <div onClick={close} className="delete-exit">
        <FiX
          // inline styles for convenience
          data-testid="quit-template-save"
          style={{ display: "flex", alignItems: "center" }}
        />
      </div>
    </div>
  );
});

export default ConfirmDeleteHead;
