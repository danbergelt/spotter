export const ADD_TOKEN = "ADD_TOKEN";

// adds token to in-memory store

export const addToken = t => {
  return { type: ADD_TOKEN, payload: t };
};