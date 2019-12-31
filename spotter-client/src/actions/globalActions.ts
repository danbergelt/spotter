import { ValueType } from "react-select";
import { Option } from "src/components/dash/subnav/types/types";
import { Moment } from "moment";
import { History } from "history";
import { FROM_SAVED } from "./workoutActions";
import { Workout } from "src/types/Workout";
import { ADD_TOKEN } from "./addTokenActions";
import axios from "axios";

export const MODAL_CTX: string = "MODAL_CTX";
export const SET_SCOPE: string = "SET_SCOPE";
export const SET_DATE: string = "SET_DATE";
export const SET_TIMESPAN: string = "SET_TIMESPAN";
export const CHANGE_SCOPE: string = "CHANGE_SCOPE";
export const CLOSE_WORKOUT_MODAL: string = "CLOSE_WORKOUT_MODAL";

// @desc --> sets dashboard scope to either weekly/monthly
type THandleScopeChange = (
  option: ValueType<Option>
) => { type: string; payload: ValueType<Option> };
export const handleScopeChangeAction: THandleScopeChange = option => {
  return {
    type: CHANGE_SCOPE,
    payload: option
  };
};

// @desc --> closes primary workout modal
type TCloseWorkoutModal = () => { type: string };
export const closeWorkoutModalAction: TCloseWorkoutModal = () => {
  return { type: CLOSE_WORKOUT_MODAL };
};

//@desc --> increment/decrement timespan
type TIncOrDec = (
  incOrDec: string,
  timespan: number
) => { type: string; payload: number } | undefined;

export const incOrDecAction: TIncOrDec = (incOrDec, timespan) => {
  if (incOrDec === "inc") {
    return { type: SET_TIMESPAN, payload: timespan + 1 };
  }
  if (incOrDec === "dec") {
    return { type: SET_TIMESPAN, payload: timespan - 1 };
  }
  return;
};

//@desc --> opens add workout modal
interface IAddWorkoutModal {
  date: Moment;
  setModal: Function;
  fetchExercises: Function;
  t: string | null;
  history: History;
  workout?: Workout;
}

type TAddWorkoutModal = (
  paramsHelper: IAddWorkoutModal
) => (dispatch: any) => void;

export const addWorkoutModalAction: TAddWorkoutModal = paramsHelper => {
  const { date, setModal, fetchExercises, t, history } = paramsHelper;

  return async dispatch => {
    dispatch({
      type: SET_DATE,
      payload: date
    });
    dispatch({
      type: MODAL_CTX,
      payload: "add"
    });
    setModal(true);
    await dispatch(fetchExercises(history, t));
  };
};

//@desc --> opens view workout modal

export const viewWorkoutModalAction: TAddWorkoutModal = paramsHelper => {
  const { date, setModal, fetchExercises, t, history, workout } = paramsHelper;

  return async dispatch => {
    dispatch({
      type: SET_DATE,
      payload: date
    });
    dispatch({
      type: MODAL_CTX,
      payload: "view"
    });
    dispatch({
      type: FROM_SAVED,
      payload: workout
    });
    setModal(true);
    await dispatch(fetchExercises(history, t));
  };
};

//@desc --> opens view workout modal
type TLogOut = () => (dispatch: any) => void;
export const logOutAction: TLogOut = () => {
  return async dispatch => {
    dispatch({
      type: ADD_TOKEN,
      payload: null
    });
    await axios.get(`${process.env.REACT_APP_T_API}/api/auth/logout`, {
      withCredentials: true
    });
  };
};


//@desc --> add token to state
type TAddToken = (token: string) => {type: string, payload: string}
export const addTokenAction: TAddToken = (token) => {
  return {type: ADD_TOKEN, payload: token}
}
