import { axiosWithAuth } from "../utils/axiosWithAuth";

export const FETCH_WORKOUTS_START = "FETCH_WORKOUTS_START";
export const FETCH_WORKOUTS_SUCCESS = "FETCH_WORKOUTS_SUCCESS";
export const FETCH_WORKOUTS_ERROR = "FETCH_WORKOUT_ERROR";

export const fetchWorkouts = range => {
  return dispatch => {
    dispatch({ type: FETCH_WORKOUTS_START });
    axiosWithAuth()
      .post(`${process.env.REACT_APP_T_API}/api/auth/workouts/range`, {
        range
      })
      .then(res => {
        dispatch({ type: FETCH_WORKOUTS_SUCCESS, payload: res.data.workouts });
      })
      .catch(err => {
        dispatch({
          type: FETCH_WORKOUTS_ERROR,
          payload: err.response.data.error
        });
      });
  };
};
