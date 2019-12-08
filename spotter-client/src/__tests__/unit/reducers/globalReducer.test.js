import { globalReducer } from "../../../reducers/globalReducer";
import { ADD_TOKEN } from "../../../actions/addTokenActions";
import { MODAL_CTX } from "../../../actions/ctxActions";
import { SET_SCOPE } from "../../../actions/timeScopeActions";

describe("global reducer", () => {
  test("should return initial state", () => {
    expect(globalReducer(undefined, {})).toEqual({
      t: null,
      ctx: null,
      scope: {
        label: "Week",
        value: "Week"
      }
    });
  });

  test("should handle ADD_TOKEN", () => {
    expect(
      globalReducer(undefined, {
        type: ADD_TOKEN,
        payload: "token"
      })
    ).toEqual({
      t: "token",
      ctx: null,
      scope: {
        label: "Week",
        value: "Week"
      }
    });
  });

  test("should handle MODAL_CTX", () => {
    expect(
      globalReducer(undefined, {
        type: MODAL_CTX,
        payload: "ctx"
      })
    ).toEqual({
      ctx: "ctx",
      t: null,
      scope: {
        label: "Week",
        value: "Week"
      }
    });
  });

  test("should handle SET_SCOPE", () => {
    expect(
      globalReducer(undefined, {
        type: SET_SCOPE,
        payload: { value: "test", label: "test" }
      })
    ).toEqual({
      ctx: null,
      t: null,
      scope: {
        label: "test",
        value: "test"
      }
    });
  });
});
