import React from "react";
import axiosWithAuth from "../../../../../utils/axiosWithAuth";

const ConfirmDeleteBody = React.memo(
  ({ onClose, closeParentModal, workoutId, onDelete }) => {
    const deleteWorkout = async () => {
      await axiosWithAuth().delete(
        `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`
      );
      onDelete(workoutId);
      onClose();
      closeParentModal();
    };

    return (
      <>
        <div style={{ fontSize: "1.3rem" }}>
          Are you sure you want to delete this workout? There is no undoing this
          action.
        </div>
        <div className="delete-btn-container">
          <div
            data-testid="conf-del"
            onClick={deleteWorkout}
            className="delete-btn del"
          >
            Delete
          </div>
          <div onClick={onClose} className="delete-btn can">
            Cancel
          </div>
        </div>
      </>
    );
  }
);

export default ConfirmDeleteBody;
