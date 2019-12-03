import { store } from "../../../../../utils/store";
import { fetchTags } from "../../../../../actions/tagsActions";
import axiosWithAuth from "../../../../../utils/axiosWithAuth";
import reFetch from "../../../../../utils/reFetch";

// tags modal helper (close modal does not need a wrapper)
export const openTagsModal = (dispatch, types, history) => {
  dispatch({ type: types.OPEN_TAG_MODAL });
  store.dispatch(fetchTags(history));
};

// save template modal helper
export const setTemplateSaveModal = (dispatch, types, payload) => {
  dispatch({ type: types.SET_TEMPLATE_SAVE, payload });
};

// from template modal helpers
export const openFromTemplateModal = async (dispatch, types) => {
  try {
    const res = await axiosWithAuth().get(
      `${process.env.REACT_APP_T_API}/api/auth/templates`
    );
    dispatch({ type: types.SET_TEMPLATES, payload: res.data.templates });
  } catch (error) {
    if (error.response)
      dispatch({
        type: types.SET_TEMPLATES_ERR,
        payload: error.response.data.error
      });
  }
  dispatch({ type: types.SET_FROM_TEMPLATE, payload: true });
};

export const closeFromTemplateModal = (dispatch, types) => {
  dispatch({ type: types.SET_FROM_TEMPLATE, payload: false });
};

// confirm delete modal helper
export const closeConfirmDelete = (dispatch, types) => {
  dispatch({ type: types.SET_CONFIRM_DELETE, payload: false });
};

// delete workout helper
export const delHandler = (dispatch, types, closeParentModal, ctx) => {
  if (ctx === "add") {
    closeParentModal();
  }
  if (ctx === "view") {
    dispatch({ type: types.SET_CONFIRM_DELETE, payload: true });
  }
};

// save workout helpers
const addWorkout = async params => {
  // submit new workout
  try {
    await axiosWithAuth().post(
      `${process.env.REACT_APP_T_API}/api/auth/workouts`,
      {
        date: params.date.format("MMM DD YYYY"),
        title: params.workout.title,
        notes: params.workout.notes,
        exercises: params.workout.exercises,
        tags: params.workout.tags
      }
    );
    // refetch updated list of workouts
    await reFetch(params.week, params.history);
    // close modal and return to dashboard
    params.closeParentModal();
  } catch (err) {
    params.dispatch({
      type: params.types.SET_SAVE_MSG,
      payload: { error: err.response.data.error }
    });
  }
};

const editWorkout = async params => {
  // submit edited workout
  try {
    await axiosWithAuth().put(
      `${process.env.REACT_APP_T_API}/api/auth/workouts/${params.workoutId}`,
      {
        title: params.workout.title,
        notes: params.workout.notes,
        exercises: params.workout.exercises,
        tags: params.workout.tags
      }
    );
    // refetch updated list of workouts
    await reFetch(params.week, params.history);
    // close modal and return to dashboard
    params.closeParentModal();
  } catch (err) {
    params.dispatch({
      type: params.types.SET_SAVE_MSG,
      payload: { error: err.response.data.error }
    });
  }
};

export const saveHandler = params => {
  if (params.ctx === "add") {
    addWorkout(params);
  }
  if (params.ctx === "view") {
    editWorkout(params);
  }
};

// delete template handler - deletes from DB and then forwards that deletion to memory
export const deleteTemplate = async (id, dispatch, types) => {
  try {
    await axiosWithAuth().delete(
      `${process.env.REACT_APP_T_API}/api/auth/templates/${id}`
    );
    dispatch({ type: types.DELETE_TEMPLATE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
