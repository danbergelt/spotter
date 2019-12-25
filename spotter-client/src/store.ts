import { reducer } from "./reducers/index";
import { createStore, applyMiddleware, CombinedState, Store } from "redux";
import thunk from "redux-thunk";
import { State } from "./types/State";

export const store: Store<CombinedState<State>> = createStore(
  reducer,
  applyMiddleware(thunk)
);
