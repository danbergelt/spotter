import { tokenReducer } from '../../reducers/tokenReducer';
import { ADD_TOKEN } from '../../actions/addTokenActions';

describe("add token reducer", () => {
  test("should return initial state", () => {
    expect(tokenReducer(undefined, {})).toEqual({
      t: null
    });
  })

  test("should handle ADD_TOKEN", () => {
    expect(
      tokenReducer(undefined, {
        type: ADD_TOKEN,
        payload: "token"
      })
    ).toEqual({ t: "token" });
  })
})