import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_TAGS_START = "FETCH_TAGS_START";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR";

export const RESET_TAGS = "RESET_TAGS";

// fetches tags and resets tags list on modal close

export const resetTags = () => {
  return { type: RESET_TAGS };
};

export const fetchTags = history => {
  return async dispatch => {
    dispatch({ type: FETCH_TAGS_START });
    try {
      const res = await axiosWithAuth().get(
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
        history.push("/500");
      }
    }
  };
};
