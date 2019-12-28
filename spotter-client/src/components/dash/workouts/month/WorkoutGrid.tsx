import React, { useState, useCallback, useEffect } from "react";
import { generateMonth, monthDashHead } from "../../../../utils/momentUtils";
import DashControls from "../DashControls";
import GridDay from "./GridDay";
import { useSelector, useDispatch } from "react-redux";
import { SET_SAVE_MSG } from "../../../../actions/optionsActions";
import { RESET_TAGS } from "../../../../actions/tagsActions";
import { MODAL_CTX } from "../../../../actions/ctxActions";
import {
  RESET_WORKOUT,
  RESET_QUEUE,
  FROM_SAVED
} from "../../../../actions/workoutActions";
import WorkoutModal from "../../workoutmodal/WorkoutModal";
import { SET_DATE } from "../../../../actions/timeScopeActions";
import { useHistory } from "react-router-dom";
import reFetch from "../../../../utils/reFetch";
import { fetchExercises } from "../../../../actions/fetchExercisesActions";
import { State } from "src/types/State";
import { Workout } from "src/types/Workout";
import { Moment } from "moment";

interface GlobalReducer {
  scope: { value: string; label: string };
  t: string | null;
}

const WorkoutGrid = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [month, setMonth] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);
  const [popover, setPopover] = useState<{ open: boolean; id: null | string }>({
    open: false,
    id: null
  });

  const fetchWorkouts = (state: State) => state.fetchWorkoutsReducer.workouts;
  const workouts: Array<Workout> = useSelector(fetchWorkouts);

  const globalReducer = (state: State) => state.globalReducer;
  const { scope, t }: GlobalReducer = useSelector(globalReducer);

  // fetches up-to-date list of workouts on re-render
  useEffect(() => {
    reFetch(month, history, scope.value, t);
  }, [month, history, scope.value, t]);

  const inc = () => {
    setMonth(month + 1);
  };

  const dec = () => {
    setMonth(month - 1);
  };

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
    (workout, date) => {
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
      dispatch(fetchExercises(history, t));
    },
    [dispatch, history, t]
  );

  // resets state in various parts of application upon workout modal close
  const closeModal: () => void = useCallback(() => {
    setModal(false);
    dispatch<{ type: string }>({ type: RESET_WORKOUT });
    dispatch<{ type: string }>({ type: RESET_TAGS });
    dispatch<{ type: string }>({ type: RESET_QUEUE });
    dispatch<{ type: string; payload: null }>({
      type: MODAL_CTX,
      payload: null
    });
    dispatch<{ type: string; payload: string }>({
      type: SET_SAVE_MSG,
      payload: ""
    });
  }, [dispatch]);

  return (
    <div className="spacer">
      <DashControls inc={inc} dec={dec} time={month} month={monthDashHead} />
      <div className="month-workout-days">
        {generateMonth(month).map((date, i) => (
          <GridDay
            openAddWorkoutModal={openAddWorkoutModal}
            openViewModal={openViewModal}
            key={date.format("MMM DD YYYY")}
            date={date}
            i={i}
            workouts={workouts}
            popover={popover}
            setPopover={setPopover}
          />
        ))}
        <WorkoutModal time={month} modal={modal} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default WorkoutGrid;
