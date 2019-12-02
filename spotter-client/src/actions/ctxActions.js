export const MODAL_CTX = "MODAL_CTX";

// sets context for modal view
// are we adding an exercise, or viewing a saved exercise?

export const setCtx = ctx => {
  return { type: MODAL_CTX, payload: ctx };
};
