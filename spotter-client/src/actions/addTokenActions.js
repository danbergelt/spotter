export const ADD_TOKEN = "ADD_TOKEN";

export const addToken = t => {
  return { type: ADD_TOKEN, payload: t };
};