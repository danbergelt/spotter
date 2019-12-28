import axiosWithAuth from "../utils/axiosWithAuth";
import { Dispatch, AnyAction } from "redux";

export const FETCH_PRS_START: string = "FETCH_PRS_START";
export const FETCH_PRS_SUCCESS: string = "FETCH_PRS_SUCCESS";
export const FETCH_PRS_ERROR: string = "FETCH_PRS_ERROR";

// fetches PRs and dispatches to store

export const fetchPrs = (t: string | null) => {
  return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    dispatch({ type: FETCH_PRS_START });
    try {
      const res = await axiosWithAuth(t).get(
        `${process.env.REACT_APP_T_API}/api/auth/prs`
      );
      dispatch({ type: FETCH_PRS_SUCCESS, payload: res.data.prs });
    } catch (error) {
      dispatch({ type: FETCH_PRS_ERROR, payload: error.response });
    }
  };
};
