import { globalReducer } from "../../reducers/globalReducer";
import { ADD_TOKEN } from "../../actions/addTokenActions";
import { MODAL_CTX } from "../../actions/ctxActions";

describe("global reducer", () => {
  test("should return initial state", () => {
    expect(globalReducer(undefined, {})).toEqual({
      t: null,
      ctx: null
    });
  });

  test("should handle ADD_TOKEN", () => {
    expect(
      globalReducer(undefined, {
        type: ADD_TOKEN,
        payload: "token"
      })
    ).toEqual({ t: "token", ctx: null });
  });

  test("should handle MODAL_CTX", () => {
    expect(
      globalReducer(undefined, {
        type: MODAL_CTX,
        payload: "ctx"
      })
    ).toEqual({ ctx: "ctx", t: null });
  });
});
