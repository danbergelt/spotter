import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  CHANGE_SCOPE,
  handleScopeChangeAction
} from "../../../actions/globalActions";

const mockStore = configureMockStore([thunk]);

describe("dispatches handleScopeChange", () => {
  test("creates proper action types for successful fetch", async () => {
    const tester = { value: "tester", label: "tester" };

    const expectedAction = [{ type: CHANGE_SCOPE, payload: tester }];

    const store = mockStore();

    store.dispatch(handleScopeChangeAction(tester));

    expect(store.getActions()).toEqual(expectedAction);
  });
});
