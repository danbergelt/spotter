import axiosWithAuth from "../utils/axiosWithAuth";
import { History } from "history";
import { Dispatch, AnyAction, Action } from "redux";

export const FETCH_WORKOUTS_START: string = "FETCH_WORKOUTS_START";
export const FETCH_WORKOUTS_SUCCESS: string = "FETCH_WORKOUTS_SUCCESS";
export const FETCH_WORKOUTS_ERROR: string = "FETCH_WORKOUT_ERROR";
export const DELETE_WORKOUT: string = "DELETE_WORKOUT";

// @desc --> fetches workouts based on range (e.g. week or month)
interface Params {
  (range: Array<string>, history: History, t: string | null): (
    dispatch: Dispatch<AnyAction>
  ) => Promise<void>;
}
export const fetchWorkouts: Params = (range, history, t) => {
  return dispatch => {
    dispatch({ type: FETCH_WORKOUTS_START });
    return axiosWithAuth(t)
      .post(`${process.env.REACT_APP_T_API}/api/auth/workouts/range`, {
        range
      })
      .then(res => {
        dispatch({ type: FETCH_WORKOUTS_SUCCESS, payload: res.data.workouts });
      })
      .catch(err => {
        if (err.response) {
          dispatch({
            type: FETCH_WORKOUTS_ERROR,
            payload: err.response.data.error
          });
        } else {
          history.push("/500");
        }
      });
  };
};

// @desc --> delete workout (both locally in the store and remote in the DB)
type TDeleteWorkout = (
  t: string | null,
  workoutId: string
) => (dispatch: Dispatch<Action>) => Promise<{ type: string; payload: string }>;
export const deleteWorkoutAction: TDeleteWorkout = (t, workoutId) => {
  return async dispatch => {
    await axiosWithAuth(t).delete(
      `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`
    );
    return dispatch({ type: DELETE_WORKOUT, payload: workoutId });
  }
};
