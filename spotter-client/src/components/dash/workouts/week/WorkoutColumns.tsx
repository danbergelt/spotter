import React, { useState, useEffect, useCallback } from "react";
import WorkoutColumn from "./WorkoutColumn";
import WorkoutModal from "../../workoutmodal/WorkoutModal";
import { generateWeek, dashHead } from "../../../../utils/momentUtils";
import DashControls from "../DashControls";
import { useHistory } from "react-router-dom";
import reFetch from "../../../../utils/reFetch";
import { useDispatch, useSelector } from "react-redux";
import { SET_DATE, SET_TIMESPAN } from "../../../../actions/timeScopeActions";
import { MODAL_CTX } from "../../../../actions/ctxActions";
import { FROM_SAVED } from "../../../../actions/workoutActions";
import { fetchExercises } from "../../../../actions/fetchExercisesActions";
import { State } from "src/types/State";
import { Workout } from "src/types/Workout";
import { Moment } from "moment";
import { closeWorkoutModalAction } from "src/actions/globalActions";

interface GlobalReducer {
  scope: { value: string; label: string };
  t: string | null;
  timeSpan: number;
}

const WorkoutColumns = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);

  const fetchWorkouts = (state: State) => state.fetchWorkoutsReducer.workouts;
  const workouts: Array<Workout> = useSelector(fetchWorkouts);

  const globalReducer = (state: State) => state.globalReducer;
  const { scope, t, timeSpan }: GlobalReducer = useSelector(globalReducer);

  const inc = () => {
    dispatch<{ type: string; payload: number }>({
      type: SET_TIMESPAN,
      payload: timeSpan + 1
    });
  };

  const dec = () => {
    dispatch<{ type: string; payload: number }>({
      type: SET_TIMESPAN,
      payload: timeSpan - 1
    });
  };

  // refetches data upon dashboard state change
  useEffect(() => {
    reFetch(timeSpan, history, scope.value, t);
  }, [timeSpan, history, scope.value, t]);

  // opens modal to add a new workout
  const openAddWorkoutModal: (date: Moment) => void = useCallback(
    date => {
      dispatch<{ type: string; payload: Moment }>({
        type: SET_DATE,
        payload: date
      });
      dispatch<{ type: string; payload: string }>({
        type: MODAL_CTX,
        payload: "add"
      });
      setModal(true);
      dispatch(fetchExercises(history, t));
    },
    [dispatch, history, t]
  );

  // opens modal to view a saved workout
  const openViewModal: (workout: Workout, date: Moment) => void = useCallback(
    async (workout, date) => {
      dispatch<{ type: string; payload: Moment }>({
        type: SET_DATE,
        payload: date
      });
      dispatch<{ type: string; payload: string }>({
        type: MODAL_CTX,
        payload: "view"
      });
      dispatch<{ type: string; payload: Workout }>({
        type: FROM_SAVED,
        payload: workout
      });
      setModal(true);
      await dispatch(fetchExercises(history, t));
    },
    [dispatch, history, t]
  );

  // resets state in various parts of application upon workout modal close
  const closeModal: () => void = useCallback(() => {
    setModal(false);
    dispatch(closeWorkoutModalAction());
  }, [dispatch]);

  return (
    <div className="spacer">
      <DashControls inc={inc} dec={dec} time={timeSpan} month={dashHead} />
      <div className="week-workouts-days">
        {generateWeek(timeSpan).map((date, i) => (
          <WorkoutColumn
            date={date}
            key={i}
            i={i}
            openAddWorkoutModal={openAddWorkoutModal}
            openViewModal={openViewModal}
            workouts={workouts}
          />
        ))}
      </div>
      <WorkoutModal time={timeSpan} modal={modal} closeModal={closeModal} />
    </div>
  );
};

export default WorkoutColumns;
