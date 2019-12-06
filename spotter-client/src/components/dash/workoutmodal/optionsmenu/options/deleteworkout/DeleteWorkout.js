import React from "react";
import { FiDelete } from "react-icons/fi";
import { useDispatch } from "react-redux";
import ConfirmDelete from "./confirmdelete/ConfirmDelete";
import { SET_CONFIRM_DELETE } from "../../../../../../actions/optionsActions";

// delete workout option container
const DeleteWorkout = React.memo(({
  closeParentModal,
  week,
  workoutId,
  ctx,
  iconClass
}) => {
  const dispatch = useDispatch();

  // references global modal context to determine action of delete workout button
  const delHandler = () => {
    if (ctx === "add") {
      closeParentModal();
    }
    if (ctx === "view") {
      dispatch({ type: SET_CONFIRM_DELETE, payload: true });
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
        week={week}
        closeParentModal={closeParentModal}
        workoutId={workoutId}
      />
    </>
  );
});

export default DeleteWorkout;
