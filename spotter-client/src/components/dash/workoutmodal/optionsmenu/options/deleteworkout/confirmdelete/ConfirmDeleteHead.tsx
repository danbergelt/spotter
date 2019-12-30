import React, { memo } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  closeConfirmDelete: () => void;
}

const ConfirmDeleteHead: React.FC<Props> = ({ closeConfirmDelete }) => {
  return (
    <div className="delete-head-container">
      <div className="delete-head">Delete Workout</div>
      <div onClick={closeConfirmDelete} className="delete-exit">
        <FiX
          // inline styles for convenience
          data-testid="quit-template-save"
          style={{ display: "flex", alignItems: "center" }}
        />
      </div>
    </div>
  );
};

export default memo(ConfirmDeleteHead);
