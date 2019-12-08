import { ADD_TOKEN } from "../actions/addTokenActions";
import { MODAL_CTX } from "../actions/ctxActions";
import { SET_SCOPE } from "../actions/timeScopeActions";

const tokenState = {
  t: null,
  ctx: null,
  scope: { value: "Week", label: "Week" }
};

// handles items such as access token, modal context, etc.

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
    case SET_SCOPE:
      return {
        ...state,
        scope: action.payload
      };
    default:
      return state;
  }
};
