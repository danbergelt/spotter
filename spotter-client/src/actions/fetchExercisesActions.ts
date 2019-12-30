import axiosWithAuth from "../utils/axiosWithAuth";
import { Dispatch, Action } from "redux";
import { History } from "history";
import { AxiosResponse } from "axios";
import { Msg } from "src/types/ExerciseOption";

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

// @desc --> delete an exercise
type TDeleteExercise = (
  t: string | null,
  id: string
) => (dispatch: Dispatch<Action>) => Promise<{ type: string; payload: string }>;

export const deleteExerciseAction: TDeleteExercise = (t, id) => {
  return async dispatch => {
    await axiosWithAuth(t).delete(
      `${process.env.REACT_APP_T_API}/api/auth/exercises/${id}`
    );
    return dispatch({
      type: DELETE_SAVED_EXERCISE,
      payload: id
    });
  };
};

// @desc --> create a new exercise
type TCreateExercise = (
  t: string | null,
  exercise: string,
  setMsg: React.Dispatch<React.SetStateAction<Msg>>
) => (dispatch: Dispatch<Action>) => Promise<any>;

export const createExerciseAction: TCreateExercise = (t, exercise, setMsg) => {
  return async dispatch => {
    try {
      const res: AxiosResponse = await axiosWithAuth(t).post(
        `${process.env.REACT_APP_T_API}/api/auth/exercises`,
        {
          name: exercise
        }
      );
      if (setMsg) setMsg({ success: "Exercise created" });
      return dispatch({ type: CREATE_EXERCISE, payload: res.data.exercise });
    } catch (error) {
      if (setMsg) return setMsg({ error: error.response.data.error });
    }
  };
};
