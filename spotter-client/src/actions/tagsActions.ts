import axiosWithAuth from "../utils/axiosWithAuth";
import { History } from "history";
import { Dispatch, Action } from "redux";

export const FETCH_TAGS_START: string = "FETCH_TAGS_START";
export const FETCH_TAGS_SUCCESS: string = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_ERROR: string = "FETCH_TAGS_ERROR";

export const RESET_TAGS: string = "RESET_TAGS";

// fetches tags and resets tags list on modal close

export const fetchTags = (history: History, t: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: FETCH_TAGS_START });
    try {
      const res = await axiosWithAuth(t).get(
        `${process.env.REACT_APP_T_API}/api/auth/tags`
      );
      return dispatch({ type: FETCH_TAGS_SUCCESS, payload: res.data.tags });
    } catch (error) {
      if (error.response) {
        return dispatch({
          type: FETCH_TAGS_ERROR,
          payload: error.response.data.error
        });
      } else {
        return history.push("/500");
      }
    }
  };
};
