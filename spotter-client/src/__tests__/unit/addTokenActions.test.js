import { addToken, ADD_TOKEN } from '../../actions/addTokenActions';

describe("add token actions", () => {
  test("can add token to memory", () => {
    const t = "t";
    const expectedAction = {
      type: ADD_TOKEN,
      payload: t
    };
    expect(addToken("t")).toEqual(expectedAction);
  })
})