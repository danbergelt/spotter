import { LOGOUT } from 'src/actions/globalActions';
import { ADD_TOKEN } from 'src/actions/addTokenActions';
import { reducer } from '../../../reducers/index';

describe('logout', () => {
  test('should handle LOGOUT', () => {
    const oldReducer = reducer(undefined, {
      type: ADD_TOKEN,
      payload: 'token'
    });
    expect(oldReducer.globalReducer.t).toBe('token');
    const newReducer = reducer({}, { type: LOGOUT });
    expect(newReducer.globalReducer.t).toBe(null);
  });
});
