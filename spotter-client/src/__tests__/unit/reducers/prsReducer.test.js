import { prsReducer } from "../../../reducers/prsReducer";
import {
  FETCH_PRS_ERROR,
  FETCH_PRS_START,
  FETCH_PRS_SUCCESS
} from "../../../actions/prActions";

describe("prs reducer", () => {
  test("should return initial state", () => {
    expect(prsReducer(undefined, {})).toEqual({
      isLoading: false,
      err: null,
      prs: []
    });
  });

  test("should handle FETCH_PRS_START", () => {
    expect(prsReducer(undefined, { type: FETCH_PRS_START })).toEqual({
      isLoading: true,
      err: null,
      prs: []
    });
  });

  test("should handle FETCH_PRS_START", () => {
    expect(prsReducer(undefined, { type: FETCH_PRS_SUCCESS, payload: "payload" })).toEqual({
      isLoading: false,
      err: null,
      prs: "payload"
    });
  });

  test("should handle FETCH_PRS_START", () => {
    expect(prsReducer(undefined, { type: FETCH_PRS_ERROR, payload: "err" })).toEqual({
      isLoading: false,
      err: "err",
      prs: []
    });
  });
});
