import axiosWithAuth from "../../../utils/axiosWithAuth";
import { store } from '../../../reducers/index';
import { ADD_TOKEN } from '../../../actions/addTokenActions';

jest.unmock("axios");

describe("axios with auth", () => {
  test("create axios object to use for calls", () => {
    store.dispatch({ type: ADD_TOKEN, payload: "token" });
    expect(axiosWithAuth().defaults.headers.Authorization).toEqual('Bearer token')
  });
});
