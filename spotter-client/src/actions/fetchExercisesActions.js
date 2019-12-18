import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_EXERCISES_SUCCESS = "FETCH_EXERCISES_SUCCESS";
export const FETCH_EXERCISES_ERROR = "FETCH_EXERCISES_ERROR";
export const CREATE_EXERCISE = "CREATE_EXERCISE";
export const DELETE_SAVED_EXERCISE = "DELETE_SAVED_EXERCISE";

// fetches saved exercises to track PRs on saved workouts

export const fetchExercises = history => {
  return dispatch => {
    return axiosWithAuth()
      .get(`${process.env.REACT_APP_T_API}/api/auth/exercises`)
      .then(res => {
        dispatch({
          type: FETCH_EXERCISES_SUCCESS,
          payload: res.data.exercises
        });
      })
      .catch(err => {
        if (err.response) {
          dispatch({
            type: FETCH_EXERCISES_ERROR,
            payload: err.response.data.error
          });
        } else {
          history.push("/500");
        }
      });
  };
};
