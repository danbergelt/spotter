import axiosWithAuth from "../utils/axiosWithAuth";
import { AxiosResponse } from "axios";
import { Dispatch, Action } from "redux";
import { Template } from "src/types/Template";
import { WorkoutReducer } from "src/types/State";

export const OPEN_TAG_MODAL: string = "OPEN_TAG_MODAL";
export const CLOSE_TAG_MODAL: string = "CLOSE_TAG_MODAL";
export const SET_ACTIVE: string = "SET_ACTIVE";
export const SET_TEMPLATE_SAVE: string = "SET_TEMPLATE_SAVE";
export const SET_FROM_TEMPLATE: string = "SET_FROM_TEMPLATE";
export const SET_CONFIRM_DELETE: string = "SET_CONFIRM_DELETE";
export const SET_TEMPLATES: string = "SET_TEMPLATES";
export const SET_TEMPLATES_ERR: string = "SET_TEMPLATES_ERR";
export const SET_SAVE_MSG: string = "SET_SAVE_MSG";
export const DELETE_TEMPLATE: string = "DELETE_TEMPLATE";
export const SET_EXERCISES: string = "SET_EXERCISES";

// all actions related to the various options/settings in the workout modal

//@desc --> sets the state of the confirm delete modal (open or closed)
type TSetConfirmDelete = (state: boolean) => { type: string; payload: boolean };
export const setConfirmDeleteAction: TSetConfirmDelete = state => {
  return { type: SET_CONFIRM_DELETE, payload: state };
};

//@desc --> sets the state of the exercise modal (open or closed)
type TSetExercisesModal = (
  state: boolean
) => { type: string; payload: boolean };
export const setExercisesModalAction: TSetExercisesModal = state => {
  return { type: SET_EXERCISES, payload: state };
};

//@desc --> sets the state of the from template modal (open or closed)
type TSetFromTemplateModal = (
  state: boolean
) => { type: string; payload: boolean };
export const setFromTemplateModalAction: TSetFromTemplateModal = state => {
  return { type: SET_FROM_TEMPLATE, payload: state };
};

//@desc --> fetches templates on from template modal open

type TFetchTemplates = (
  t: string | null
) => (
  dispatch: Dispatch<Action>
) => Promise<
  | { type: string; payload: Array<Template> }
  | { type: string; payload: string }
  | undefined
>;

export const fetchTemplatesAction: TFetchTemplates = t => {
  return async dispatch => {
    try {
      const res: AxiosResponse<any> = await axiosWithAuth(t).get(
        `${process.env.REACT_APP_T_API}/api/auth/templates`
      );
      return dispatch({
        type: SET_TEMPLATES,
        payload: res.data.templates
      });
    } catch (error) {
      if (error.response) {
        return dispatch({
          type: SET_TEMPLATES_ERR,
          payload: error.response.data.error
        });
      } else {
        return;
      }
    }
  };
};

//@desc --> delete a template
type TDeleteTemplate = (
  t: string | null,
  id: string
) => (dispatch: Dispatch<Action>) => Promise<{ type: string; payload: string }>;
export const deleteTemplateAction: TDeleteTemplate = (t, id) => {
  return async dispatch => {
    await axiosWithAuth(t).delete(
      `${process.env.REACT_APP_T_API}/api/auth/templates/${id}`
    );
    return dispatch({
      type: DELETE_TEMPLATE,
      payload: id
    });
  };
};

//@desc --> set template save modal state (open or closed)
type TSetSaveTemplateModal = (
  state: boolean
) => { type: string; payload: boolean };
export const setSaveTemplateModalAction: TSetSaveTemplateModal = state => {
  return { type: SET_TEMPLATE_SAVE, payload: state };
};

//@desc --> save template
type TSaveTemplate = (
  t: string | null,
  tempName: string,
  workout: WorkoutReducer,
  setTempName: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<
    React.SetStateAction<{
      success?: string | undefined;
      error?: string | undefined;
    }>
  >
) => void;

export const saveTemplateAction: TSaveTemplate = async (
  t,
  tempName,
  workout,
  setTempName,
  setMessage
) => {
  try {
    await axiosWithAuth(t).post(
      `${process.env.REACT_APP_T_API}/api/auth/templates`,
      {
        name: tempName,
        title: workout.title,
        tags: workout.tags,
        notes: workout.notes,
        exercises: workout.exercises
      }
    );
    setTempName("");
    setMessage({ success: "Template created" });
  } catch (error) {
    if (error.response) {
      setMessage({ error: error.response.data.error });
    }
  }
};
