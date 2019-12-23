import {
  FETCH_PRS_SUCCESS,
  FETCH_PRS_ERROR,
  FETCH_PRS_START
} from "../actions/prActions";

const fetchPrsState = {
  err: null,
  isLoading: false,
  prs: {}
};

export const prsReducer = (state = fetchPrsState, action) => {
  switch (action.type) {
    case FETCH_PRS_START:
      return {
        ...state,
        err: null,
        isLoading: true
      };
    case FETCH_PRS_ERROR:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    case FETCH_PRS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        prs: action.payload
      };
    default:
      return state;
  }
};
