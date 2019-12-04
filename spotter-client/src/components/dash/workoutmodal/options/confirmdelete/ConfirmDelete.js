import React, { useCallback } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { styles } from "./confirmDeleteStyles";
import { useSelector, useDispatch } from "react-redux";
import { SET_CONFIRM_DELETE } from "../../../../../actions/optionsActions";
import { DELETE_WORKOUT } from "../../../../../actions/fetchWorkoutsActions";
import ConfirmDeleteBody from "./ConfirmDeleteBody";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const ConfirmDelete = ({ workoutId, closeParentModal, week }) => {
  const confirmDelete = useSelector(
    state => state.optionsReducer.confirmDelete
  );

  const dispatch = useDispatch();

  const close = useCallback(() => {
    dispatch({ type: SET_CONFIRM_DELETE, payload: false });
  }, [dispatch]);

  const dispatchDelete = useCallback(
    id => {
      dispatch({ type: DELETE_WORKOUT, payload: id });
    },
    [dispatch]
  );

  return (
    <Modal
      style={styles}
      isOpen={confirmDelete}
      onRequestClose={close}
      contentLabel="Confirm Delete Workout"
    >
      <div className="delete-container">
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
        <ConfirmDeleteBody
          onDelete={dispatchDelete}
          week={week}
          workoutId={workoutId}
          closeParentModal={closeParentModal}
          onClose={close}
        />
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
