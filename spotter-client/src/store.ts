import {
  createStore,
  applyMiddleware,
  CombinedState,
  Store,
  AnyAction
} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import { State } from './types/State';

const store: Store<CombinedState<State>, AnyAction> = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
