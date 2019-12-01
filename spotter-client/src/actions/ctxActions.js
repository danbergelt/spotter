export const MODAL_CTX = "MODAL_CTX";

export const setCtx = ctx => {
  return { type: MODAL_CTX, payload: ctx };
};
