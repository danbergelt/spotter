import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/index";

// ran into issues without the separate store exports

export const store = createStore(reducer, applyMiddleware(thunk));

export default store;