import React, { useReducer } from "react";
import {
  FiTag,
  FiPlusCircle,
  FiSave,
  FiDelete,
  FiPackage
} from "react-icons/fi";

// components
import WorkoutOption from "./WorkoutOption";
import TagsModal from "../tagsmodal/TagsModal";
import TemplateSave from "../templatesave/TemplateSave";
import FromTemplate from "../fromtemplate/FromTemplate";
import ConfirmDelete from "../options/ConfirmDelete";

// helpers
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { reducer, types, initialState } from "./localutils/optionsReducer";
import {
  openTagsModal,
  setTemplateSaveModal,
  openFromTemplateModal,
  closeFromTemplateModal,
  closeConfirmDelete,
  delHandler,
  saveHandler
} from "./localutils/optionsActions";

const WorkoutOptions = ({ closeParentModal, week, date }) => {
  
  const ctx = useSelector(state => state.globalReducer.ctx);
  const workoutId = useSelector(state => state.workoutReducer._id);
  const workout = useSelector(state => state.workoutReducer);
  const history = useHistory();
  const iconClass = "add-workout-options-icon";
  const [state, dispatch] = useReducer(reducer, initialState);

  // this component is a switchboard of sorts, serving as a central point for crucial modal functionailty
  // since much of this state is localized and not very complex, opted for useReducer instead of Redux
  // reducer && actions can be found in this directory's localutils folder

  return (
    <div className="add-workout-options-container">
      <h1 className="add-workout-options-title sub">ACTIONS</h1>
      <div className="add-workout-options-buttons">
        <div
          data-testid="tags-modal"
          onClick={() => openTagsModal(dispatch, types, history)}
        >
          <WorkoutOption text={"Tags"} icon={<FiTag className={iconClass} />} />
        </div>
        <TagsModal
          state={state}
          active={state.active}
          types={types}
          dispatch={dispatch}
          modal={state.tagModal}
        />
        <WorkoutOption
          dispatch={dispatch}
          types={types}
          testing={"save-template"}
          action={setTemplateSaveModal}
          text={"Template"}
          icon={<FiSave className={iconClass} />}
        />
        <TemplateSave
          dispatch={dispatch}
          types={types}
          templateSave={state.templateSave}
          close={setTemplateSaveModal}
        />
        <WorkoutOption
          dispatch={dispatch}
          types={types}
          action={openFromTemplateModal}
          text={"From Template"}
          icon={<FiPackage className={iconClass} />}
        />
        <FromTemplate
          dispatch={dispatch}
          types={types}
          templates={state.templates}
          err={state.templatesErr}
          fromTemplate={state.fromTemplate}
          close={closeFromTemplateModal}
        />
        <div
          data-testid="del-workout"
          onClick={() => delHandler(dispatch, types, closeParentModal, ctx)}
          className="add-workout-options-button delete"
        >
          <FiDelete className={iconClass} /> Delete
        </div>
        <ConfirmDelete
          week={week}
          closeParentModal={closeParentModal}
          workoutId={workoutId}
          dispatch={dispatch}
          types={types}
          close={closeConfirmDelete}
          confirmDelete={state.confirmDelete}
        />
        <div
          onClick={() =>
            saveHandler({
              dispatch,
              types,
              ctx,
              workout,
              closeParentModal,
              workoutId,
              week,
              history,
              date
            })
          }
          className="add-workout-options-button publish"
        >
          <FiPlusCircle className={iconClass} />
          {ctx === "add" ? "Save" : "Update"}
        </div>
        {state.saveMsg.error && (
          <div className="save error">{state.saveMsg.error}</div>
        )}
      </div>
    </div>
  );
};

export default WorkoutOptions;
