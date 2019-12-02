import {
  FETCH_TAGS_START,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR,
  RESET_TAGS
} from "../actions/tagsActions";

const tagsState = {
  isLoading: false,
  err: null,
  tags: {}
};

// for tags modal

export const tagsReducer = (state = tagsState, action) => {
  switch (action.type) {
    case FETCH_TAGS_START:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tags: action.payload
      };
    case FETCH_TAGS_ERROR: {
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    }
    case RESET_TAGS: {
      return {
        ...state,
        tags: {}
      };
    }
    default:
      return state;
  }
};
