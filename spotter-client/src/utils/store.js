import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/index";

// two exports allow me to combine reducers && export the store to use as a utility - otherwise, there are import issues

export const store = createStore(reducer, applyMiddleware(thunk));

export default store;