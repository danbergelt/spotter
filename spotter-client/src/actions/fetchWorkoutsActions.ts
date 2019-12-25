import axiosWithAuth from "../utils/axiosWithAuth";
import { History } from "history";
import { Dispatch, Action } from "redux";

export const FETCH_WORKOUTS_START: string = "FETCH_WORKOUTS_START";
export const FETCH_WORKOUTS_SUCCESS: string = "FETCH_WORKOUTS_SUCCESS";
export const FETCH_WORKOUTS_ERROR: string = "FETCH_WORKOUT_ERROR";
export const DELETE_WORKOUT: string = "DELETE_WORKOUT";

// fetches workouts based on range (e.g. week OR month)

export const fetchWorkouts = (range: string[], history: History, t: string) => {
  return (dispatch: Dispatch<Action<any>>): Promise<void> => {
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
