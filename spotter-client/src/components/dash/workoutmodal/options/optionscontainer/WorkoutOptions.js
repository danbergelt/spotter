import React, { useCallback } from "react";
import axiosWithAuth from "../../../../../utils/axiosWithAuth";
import reFetch from "../../../../../utils/reFetch";
import {
  FiTag,
  FiPlusCircle,
  FiSave,
  FiDelete,
  FiPackage
} from "react-icons/fi";

// components
import WorkoutOption from "./WorkoutOption";
import TagsModal from "../../tagsmodal/TagsModal";
import TemplateSave from "../../templatesave/TemplateSave";
import FromTemplate from "../../fromtemplate/FromTemplate";
import ConfirmDelete from "../confirmdelete/ConfirmDelete";

// helpers
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  OPEN_TAG_MODAL,
  SET_SAVE_MSG,
  SET_CONFIRM_DELETE,
  SET_TEMPLATE_SAVE,
  SET_TEMPLATES,
  SET_TEMPLATES_ERR,
  SET_FROM_TEMPLATE
} from "../../../../../actions/optionsActions";
import { fetchTags } from "../../../../../actions/tagsActions";
import { saveWorkout } from "./calls";

const WorkoutOptions = ({ closeParentModal, week, date }) => {
  const ctx = useSelector(state => state.globalReducer.ctx);
  const workoutId = useSelector(state => state.workoutReducer._id);
  const workout = useSelector(state => state.workoutReducer);
  const saveMsg = useSelector(state => state.optionsReducer.saveMsg);
  const dispatch = useDispatch();
  const openTagsModal = useCallback(() => {
    dispatch({ type: OPEN_TAG_MODAL });
    dispatch(fetchTags(history));
  });
  const setTemplateSaveModal = useCallback(
    status => {
      dispatch({ type: SET_TEMPLATE_SAVE, payload: status });
    },
    [dispatch]
  );
  const history = useHistory();
  const iconClass = "add-workout-options-icon";

  const openFromTemplateModal = useCallback(async () => {
    try {
      const res = await axiosWithAuth().get(
        `${process.env.REACT_APP_T_API}/api/auth/templates`
      );
      dispatch({ type: SET_TEMPLATES, payload: res.data.templates });
    } catch (error) {
      if (error.response)
        dispatch({
          type: SET_TEMPLATES_ERR,
          payload: error.response.data.error
        });
    }
    dispatch({ type: SET_FROM_TEMPLATE, payload: true });
  }, [dispatch]);

  const saveWorkoutErr = useCallback(
    err => {
      dispatch({
        type: SET_SAVE_MSG,
        payload: { error: err.response.data.error }
      });
    },
    [dispatch]
  );

  const saveHandler = async () => {
    if (ctx === "add") {
      saveWorkout(
        date,
        workout,
        closeParentModal,
        saveWorkoutErr,
        week,
        history
      );
    }

    if (ctx === "view") {
      try {
        await axiosWithAuth().put(
          `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`,
          {
            title: workout.title,
            notes: workout.notes,
            exercises: workout.exercises,
            tags: workout.tags
          }
        );
        // refetch updated list of workouts
        await reFetch(week, history);
        // close modal and return to dashboard
        closeParentModal();
      } catch (err) {
        dispatch({
          type: SET_SAVE_MSG,
          payload: { error: err.response.data.error }
        });
      }
    }
  };

  // delete workout helper
  const delHandler = () => {
    if (ctx === "add") {
      closeParentModal();
    }
    if (ctx === "view") {
      dispatch({ type: SET_CONFIRM_DELETE, payload: true });
    }
  };

  return (
    <div className="add-workout-options-container">
      <h1 className="add-workout-options-title sub">ACTIONS</h1>
      <div className="add-workout-options-buttons">
        <div data-testid="tags-modal" onClick={openTagsModal}>
          <WorkoutOption text={"Tags"} icon={<FiTag className={iconClass} />} />
        </div>
        <TagsModal />
        <WorkoutOption
          testing={"save-template"}
          action={setTemplateSaveModal}
          text={"Template"}
          icon={<FiSave className={iconClass} />}
        />
        <TemplateSave close={setTemplateSaveModal} />
        <WorkoutOption
          action={openFromTemplateModal}
          text={"From Template"}
          icon={<FiPackage className={iconClass} />}
        />
        <FromTemplate />
        <div
          data-testid="del-workout"
          onClick={delHandler}
          className="add-workout-options-button delete"
        >
          <FiDelete className={iconClass} /> Delete
        </div>
        <ConfirmDelete
          week={week}
          closeParentModal={closeParentModal}
          workoutId={workoutId}
        />
        <div
          onClick={saveHandler}
          className="add-workout-options-button publish"
        >
          <FiPlusCircle className={iconClass} />
          {ctx === "add" ? "Save" : "Update"}
        </div>
        {saveMsg.error && <div className="save error">{saveMsg.error}</div>}
      </div>
    </div>
  );
};

export default WorkoutOptions;
