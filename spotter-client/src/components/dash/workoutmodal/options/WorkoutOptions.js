import React, { useState } from "react";
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

import { connect } from "react-redux";
import { fetchTags } from "../../../../actions/tagsActions";
import { useHistory } from "react-router-dom";

const WorkoutOptions = ({ fetchTags }) => {
  const history = useHistory();
  const iconClass = "add-workout-options-icon";

  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(false);
  const [templateSave, setTemplateSave] = useState(false);

  const openModal = () => setModal(true);

  const closeModal = () => {
    setModal(false);
    setActive(0);
  };

  const openTagsModal = () => {
    setModal(true);
    fetchTags(history);
  };

  const openTemplateSaveModal = () => {
    setTemplateSave(true);
  };

  const closeTemplateSaveModal = () => {
    setTemplateSave(false);
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
          closeModal={closeModal}
        />
        <WorkoutOption
          action={openTemplateSaveModal}
          text={"Template"}
          icon={<FiSave className={iconClass} />}
        />
        <TemplateSave
          templateSave={templateSave}
          close={closeTemplateSaveModal}
        />
        <WorkoutOption
          text={"From Template"}
          icon={<FiPackage className={iconClass} />}
        />
        <div className="add-workout-options-button delete">
          <FiDelete className={iconClass} /> Delete
        </div>
        <div className="add-workout-options-button publish">
          <FiPlusCircle className={iconClass} /> Save
        </div>
      </div>
    </div>
  );
};

export default connect(null, { fetchTags })(WorkoutOptions);
