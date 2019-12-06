import React, { useState, useCallback } from "react";
import WorkoutColumnContent from "./WorkoutColumnContent";
import WorkoutModal from "../workoutmodal/WorkoutModal";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_CTX } from "../../../actions/ctxActions";
import {
  RESET_WORKOUT,
  RESET_QUEUE,
  FROM_SAVED
} from "../../../actions/workoutActions";
import { RESET_TAGS } from "../../../actions/tagsActions";
import WorkoutCard from "./WorkoutCard";
import { SET_SAVE_MSG } from "../../../actions/optionsActions";
import { useHistory } from 'react-router-dom';

const WorkoutColumn = ({ date, i, week }) => {
  const [modal, setModal] = useState(false);
  const workouts = useSelector(state => state.fetchWorkoutsReducer.workouts);
  const dispatch = useDispatch();

  const openAddWorkoutModal = useCallback(() => {
    dispatch({ type: MODAL_CTX, payload: "add" });
    setModal(true);
  }, [dispatch]);

  const openViewModal = workout => {
    dispatch({ type: MODAL_CTX, payload: "view" });
    dispatch({ type: FROM_SAVED, payload: workout });
    setModal(true);
  };

  // resets state in various parts of application upon workout modal close 
  const closeModal = useCallback(() => {
    setModal(false);
    dispatch({ type: RESET_WORKOUT });
    dispatch({ type: RESET_TAGS });
    dispatch({ type: RESET_QUEUE });
    dispatch({ type: MODAL_CTX, payload: null });
    dispatch({ type: SET_SAVE_MSG, payload: "" });
  }, [dispatch]);

  return (
    <div className="week-workouts-column">
      <WorkoutColumnContent
        date={date}
        i={i}
        openAddWorkoutModal={openAddWorkoutModal}
      />
      <WorkoutModal
        date={date}
        week={week}
        modal={modal}
        closeModal={closeModal}
      />
      <div>
        {/* filter workouts for workouts matching this date */}
        {workouts
          .filter(el => el.date === date.format("MMM DD YYYY"))
          .map(data => (
            <div
              className="workout-card-container"
              onClick={() => openViewModal(data)}
              key={data._id}
            >
              <WorkoutCard data={data} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkoutColumn;
