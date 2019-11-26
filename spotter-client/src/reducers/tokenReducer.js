import { ADD_TOKEN } from '../actions/addTokenActions';

const tokenState = {
  t: null
}

export const tokenReducer = (state = tokenState, action) => {
  switch(action.type){
    case ADD_TOKEN:
      return {
        ...state,
        t: action.payload
      }
    default:
      return state;
  }
}