import React, { memo } from "react";
import { useSelector } from "react-redux";
import axiosWithAuth from "../../../../../../../utils/axiosWithAuth";
import { State } from "src/types/State";

interface Props {
  onClose: () => void;
  closeParentModal: () => void;
  workoutId: string | null;
  onDelete: (id: string) => void;
}

const ConfirmDeleteBody: React.FC<Props> = ({
  onClose,
  closeParentModal,
  workoutId,
  onDelete
}) => {
  const fetchToken = (state: State) => state.globalReducer.t;
  const t: string | null = useSelector(fetchToken);

  const deleteWorkout: () => Promise<void> = async () => {
    if (workoutId) {
      await axiosWithAuth(t).delete(
        `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`
      );
      onDelete(workoutId);
      onClose();
      closeParentModal();
    }
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
};

export default memo(ConfirmDeleteBody);
