import axiosWithAuth from "../utils/axiosWithAuth";
import { Dispatch, Action } from "redux";
import { History } from "history";
import { AxiosResponse } from "axios";

export const FETCH_EXERCISES_SUCCESS: string = "FETCH_EXERCISES_SUCCESS";
export const FETCH_EXERCISES_ERROR: string = "FETCH_EXERCISES_ERROR";
export const CREATE_EXERCISE: string = "CREATE_EXERCISE";
export const DELETE_SAVED_EXERCISE: string = "DELETE_SAVED_EXERCISE";

// fetches saved exercises to track PRs on saved workouts

export const fetchExercises = (history: History, t: string | null) => {
  return (dispatch: Dispatch<Action<any>>): Promise<void> => {
    return axiosWithAuth(t)
      .get(`${process.env.REACT_APP_T_API}/api/auth/exercises`)
      .then((res: AxiosResponse<any>) => {
        dispatch({
          type: FETCH_EXERCISES_SUCCESS,
          payload: res.data.exercises
        });
      })
      .catch((err: any) => {
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
