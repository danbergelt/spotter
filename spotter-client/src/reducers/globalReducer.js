import { ADD_TOKEN } from "../actions/addTokenActions";
import { MODAL_CTX } from "../actions/ctxActions";

const tokenState = {
  t: null,
  ctx: null
};

export const globalReducer = (state = tokenState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        t: action.payload
      };
    case MODAL_CTX:
      return {
        ...state,
        ctx: action.payload
      };
    default:
      return state;
  }
};
