import React, { memo } from "react";
import { FiDelete } from "react-icons/fi";
import { useDispatch } from "react-redux";
import ConfirmDelete from "./confirmdelete/ConfirmDelete";
import { SET_CONFIRM_DELETE } from "../../../../../../actions/optionsActions";

interface Props {
  closeParentModal: () => void;
  workoutId: string | null;
  ctx: string | null;
  iconClass: string;
}

// delete workout option container
const DeleteWorkout: React.FC<Props> = ({ closeParentModal, workoutId, ctx, iconClass }) => {
  const dispatch = useDispatch();

  // references global modal context to determine action of delete workout button
  const delHandler: () => void = () => {
    if (ctx === "add") {
      closeParentModal();
    }
    if (ctx === "view") {
      dispatch<{type: string, payload: boolean}>({ type: SET_CONFIRM_DELETE, payload: true });
    }
  };

  return (
    <>
      <div
        data-testid="del-workout"
        onClick={delHandler}
        className="add-workout-options-button delete"
      >
        <FiDelete className={iconClass} /> Delete
      </div>
      <ConfirmDelete
        closeParentModal={closeParentModal}
        workoutId={workoutId}
      />
    </>
  );
};

export default memo(DeleteWorkout);
