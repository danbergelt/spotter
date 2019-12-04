import React, { useCallback } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { styles } from "./localutils/confirmDeleteStyles";
import reFetch from "../../../../utils/reFetch";
import { useSelector, useDispatch } from "react-redux";
import { SET_CONFIRM_DELETE } from "../../../../actions/optionsActions";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const ConfirmDelete = ({ workoutId, closeParentModal, week }) => {
  const history = useHistory();

  const deleteWorkout = async () => {
    await axiosWithAuth().delete(
      `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`
    );
    await reFetch(week, history);
    close();
    // hack-ish fix to smooth out reFetch shuddering - state updates slightly out of sync with UI
    setTimeout(() => closeParentModal(), 50);
  };

  const dispatch = useDispatch();
  const close = useCallback(() => {
    dispatch({ type: SET_CONFIRM_DELETE, payload: false });
  });
  const confirmDelete = useSelector(
    state => state.optionsReducer.confirmDelete
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
          <div onClick={close} className="delete-btn can">
            Cancel
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
