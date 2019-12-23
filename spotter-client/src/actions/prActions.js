import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_PRS_START = "FETCH_PRS_START";
export const FETCH_PRS_SUCCESS = "FETCH_PRS_SUCCESS";
export const FETCH_PRS_ERROR = "FETCH_PRS_ERROR";

// fetches PRs and dispatches to store

export const fetchPrs = t => {
  return async dispatch => {
    dispatch({ type: FETCH_PRS_START });
    try {
      const res = await axiosWithAuth(t).get(
        `${process.env.REACT_APP_T_API}/api/auth/prs`
      );
      dispatch({ type: FETCH_PRS_SUCCESS, payload: res.data.prs });
    } catch (error) {
      console.log(error);
    }
  };
};
