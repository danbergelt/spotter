import { History } from 'history';
import { Dispatch, AnyAction, Action } from 'redux';
import { Moment } from 'moment';
import axiosWithAuth from '../utils/axiosWithAuth';
import { generateWeek, generateMonth } from '../utils/momentUtils';

export const FETCH_WORKOUTS_START = 'FETCH_WORKOUTS_START';
export const FETCH_WORKOUTS_SUCCESS = 'FETCH_WORKOUTS_SUCCESS';
export const FETCH_WORKOUTS_ERROR = 'FETCH_WORKOUT_ERROR';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';

// fetches workouts based on range (e.g. week or month)
interface Params {
  (time: number, history: History, scope: string, t: string | null): (
    dispatch: Dispatch<AnyAction>
  ) => Promise<void>;
}
export const fetchWorkouts: Params = (time, history, scope, t) => {
  let range: Array<Moment> = [];

  if (scope === 'Week') {
    range = generateWeek(time);
  }

  if (scope === 'Month') {
    range = generateMonth(time);
  }

  const formattedRange: Array<string> = range.map(d => d.format('MMM DD YYYY'));

  return dispatch => {
    dispatch({ type: FETCH_WORKOUTS_START });
    return axiosWithAuth(t)
      .post(`${process.env.REACT_APP_T_API}/api/auth/workouts/range`, {
        range: formattedRange
      })
      .then(res => {
        dispatch({ type: FETCH_WORKOUTS_SUCCESS, payload: res.data.workouts });
      })
      ['catch'](err => {
        if (err.response) {
          dispatch({
            type: FETCH_WORKOUTS_ERROR,
            payload: err.response.data.error
          });
        } else {
          history.push('/500');
        }
      });
  };
};

// delete workout (both locally in the store and remote in the DB)
type TDeleteWorkout = (
  t: string | null,
  workoutId: string
) => (dispatch: Dispatch<Action>) => Promise<{ type: string; payload: string }>;
export const deleteWorkoutAction: TDeleteWorkout = (t, workoutId) => {
  return async dispatch => {
    await axiosWithAuth(t)['delete'](
      `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`
    );
    return dispatch({ type: DELETE_WORKOUT, payload: workoutId });
  };
};
