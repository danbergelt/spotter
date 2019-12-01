import React, { useState } from "react";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import {
  FiTag,
  FiPlusCircle,
  FiSave,
  FiDelete,
  FiPackage
} from "react-icons/fi";

import WorkoutOption from "./WorkoutOption";
import TagsModal from "../tagsmodal/TagsModal";
import TemplateSave from "../templatesave/TemplateSave";
import FromTemplate from "../fromtemplate/FromTemplate";
import ConfirmDelete from "../options/ConfirmDelete";

import { connect } from "react-redux";
import { fetchTags } from "../../../../actions/tagsActions";
import { useHistory } from "react-router-dom";

const WorkoutOptions = ({
  fetchTags,
  closeParentModal,
  ctx,
  workoutId,
  week
}) => {
  const history = useHistory();
  const iconClass = "add-workout-options-icon";

  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(false);
  const [templateSave, setTemplateSave] = useState(false);
  const [fromTemplate, setFromTemplate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [templatesErr, setTemplatesErr] = useState("");

  const openTagsModal = () => {
    setModal(true);
    fetchTags(history);
  };

  const closeTagsModal = () => {
    setModal(false);
    setActive(0);
  };

  const openTemplateSaveModal = () => {
    setTemplateSave(true);
  };

  const closeTemplateSaveModal = () => {
    setTemplateSave(false);
  };

  const openFromTemplateModal = async () => {
    try {
      const res = await axiosWithAuth().get(
        `${process.env.REACT_APP_T_API}/api/auth/templates`
      );
      setTemplates(res.data.templates);
    } catch (error) {
      if (error.response) setTemplatesErr(error.response.data.error);
    }
    setFromTemplate(true);
  };

  const closeFromTemplateModal = () => {
    setFromTemplate(false);
  };

  const openConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const delHandler = () => {
    if (ctx === "add") {
      closeParentModal();
    }
    if (ctx === "view") {
      openConfirmDelete();
    }
  };

  return (
    <div className="add-workout-options-container">
      <h1 className="add-workout-options-title sub">ACTIONS</h1>
      <div className="add-workout-options-buttons">
        <div data-testid="tags-modal" onClick={openTagsModal}>
          <WorkoutOption text={"Tags"} icon={<FiTag className={iconClass} />} />
        </div>
        <TagsModal
          active={active}
          setActive={setActive}
          modal={modal}
          closeModal={closeTagsModal}
        />
        <WorkoutOption
          testing={"save-template"}
          action={openTemplateSaveModal}
          text={"Template"}
          icon={<FiSave className={iconClass} />}
        />
        <TemplateSave
          templateSave={templateSave}
          close={closeTemplateSaveModal}
        />
        <WorkoutOption
          action={openFromTemplateModal}
          text={"From Template"}
          icon={<FiPackage className={iconClass} />}
        />
        <FromTemplate
          templates={templates}
          err={templatesErr}
          fromTemplate={fromTemplate}
          close={closeFromTemplateModal}
        />
        <div onClick={delHandler} className="add-workout-options-button delete">
          <FiDelete className={iconClass} /> Delete
        </div>
        <ConfirmDelete
          week={week}
          closeParentModal={closeParentModal}
          workoutId={workoutId}
          close={closeConfirmDelete}
          confirmDelete={confirmDelete}
        />
        <div className="add-workout-options-button publish">
          <FiPlusCircle className={iconClass} /> Save
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ctx: state.globalReducer.ctx,
    workoutId: state.workoutReducer._id
  };
};

export default connect(mapStateToProps, { fetchTags })(WorkoutOptions);
