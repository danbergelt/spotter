import { globalReducer } from "../../../reducers/globalReducer";
import { ADD_TOKEN } from "../../../actions/addTokenActions";
import { MODAL_CTX } from "../../../actions/ctxActions";
import { SET_SCOPE, SET_DATE } from "../../../actions/timeScopeActions";

describe("global reducer", () => {
  test("should return initial state", () => {
    expect(globalReducer(undefined, {})).toEqual({
      t: null,
      ctx: null,
      scope: {
        label: "Week",
        value: "Week"
      },
      date: null
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
      },
      date: null
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
      },
      date: null
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
      },
      date: null
    });
  });

  test("should handle SET_DATE", () => {
    expect(
      globalReducer(undefined, {
        type: SET_DATE,
        payload: { date: "date" }
      })
    ).toEqual({
      ctx: null,
      t: null,
      scope: {
        label: "Week",
        value: "Week"
      },
      date: { date: "date" }
    });
  });
});
