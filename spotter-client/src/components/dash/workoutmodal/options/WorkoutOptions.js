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

const WorkoutOptions = () => {
  const iconClass = "add-workout-options-icon";

  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  return (
    <div className="add-workout-options-container">
      <h1 className="add-workout-options-title sub">ACTIONS</h1>
      <div className="add-workout-options-buttons">
        <div data-testid="tags-modal" onClick={openModal}>
          <WorkoutOption text={"Tags"} icon={<FiTag className={iconClass} />} />
        </div>
        <TagsModal modal={modal} closeModal={closeModal} />
        <WorkoutOption
          text={"Template"}
          icon={<FiSave className={iconClass} />}
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

export default WorkoutOptions;
