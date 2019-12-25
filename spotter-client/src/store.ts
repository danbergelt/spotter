import { reducer } from "./reducers/index";
import { createStore, applyMiddleware, Action} from "redux";
import thunk from "redux-thunk";

export const store = createStore<any, Action<any>, any, any>(reducer, applyMiddleware(thunk));

