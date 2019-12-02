// opting for useReducer here instead of incorporating into redux store due to the localized nature of much of this state
// too local for Redux, but complex and interwoven enough to require a more elegant solution than useState

export const initialState = {
  active: 0,
  tagModal: false,
  templateSave: false,
  fromTemplate: false,
  confirmDelete: false,
  templates: [],
  templatesErr: "",
  saveMsg: {}
};

export const types = {
  OPEN_TAG_MODAL: "OPEN_TAG_MODAL",
  CLOSE_TAG_MODAL: "CLOSE_TAG_MODAL",
  SET_ACTIVE: "SET_ACTIVE",
  SET_TEMPLATE_SAVE: "SET_TEMPLATE_SAVE",
  SET_FROM_TEMPLATE: "SET_FROM_TEMPLATE",
  SET_CONFIRM_DELETE: "SET_CONFIRM_DELETE",
  SET_TEMPLATES: "SET_TEMPLATES",
  SET_TEMPLATES_ERR: "SET_TEMPLATES_ERR",
  SET_SAVE_MSG: "SET_SAVE_MSG"
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.OPEN_TAG_MODAL:
      return { ...state, tagModal: true };
    case types.CLOSE_TAG_MODAL:
      return { ...state, tagModal: false, active: 0 };
    case types.SET_ACTIVE:
      return { ...state, active: action.payload };
    case types.SET_TEMPLATE_SAVE:
      return { ...state, templateSave: action.payload };
    case types.SET_FROM_TEMPLATE:
      return { ...state, fromTemplate: action.payload };
    case types.SET_CONFIRM_DELETE:
      return { ...state, confirmDelete: action.payload };
    case types.SET_TEMPLATES:
      return { ...state, templates: action.payload };
    case types.SET_TEMPLATES_ERR:
      return { ...state, templatesErr: action.payload };
    case types.SET_SAVE_MSG:
      return { ...state, saveMsg: action.payload };
  }
};
