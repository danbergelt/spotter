import React from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { generateWeek } from "../../../../utils/momentUtils";
import { connect } from "react-redux";
import { fetchWorkouts } from "../../../../actions/fetchWorkoutsActions";
import { useHistory } from "react-router-dom";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const ConfirmDelete = ({
  close,
  confirmDelete,
  workoutId,
  closeParentModal,
  week,
  fetchWorkouts
}) => {
  const customStyles = {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "250px",
      height: "175px",
      marginLeft: "60vw",
      marginTop: "35.5vh"
    }
  };

  const history = useHistory();

  const reFetch = () => {
    let range = generateWeek(week);
    range = range.map(d => d.format("MMM DD YYYY"));
    fetchWorkouts(range, history);
  };

  const deleteWorkout = async () => {
    await axiosWithAuth().delete(
      `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`
    );
    close();
    closeParentModal();
    await reFetch();
  };

  return (
    <Modal
      style={customStyles}
      isOpen={confirmDelete}
      onRequestClose={close}
      contentLabel="Confirm Delete Workout"
    >
      <div className="delete-container">
        <div className="delete-head-container">
          <div className="delete-head">Delete Workout</div>
          <div onClick={close} className="delete-exit">
            <FiX
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

export default connect(null, { fetchWorkouts })(ConfirmDelete);
