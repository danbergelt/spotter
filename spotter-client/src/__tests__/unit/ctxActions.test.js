import { MODAL_CTX, setCtx } from '../../actions/ctxActions';

describe("ctx actions", () => {
  test("can set ctx", () => {
    const ctx = "ctx";
    const expectedAction = {
      type: MODAL_CTX,
      payload: ctx
    };
    expect(setCtx("ctx")).toEqual(expectedAction);
  })
})