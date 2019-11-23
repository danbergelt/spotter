import React from "react";
import { FiX } from "react-icons/fi";

const TagsModalHead = ({ closeModal, active, setActive }) => {
  return (
    <div className="tags-modal-head-container">
      <div className="tags-modal-head-tabs">
        <div
          className={
            active === 0 ? "tags-modal-tab-active" : "tags-modal-tab-not-active"
          }
          onClick={() => setActive(0)}
        >
          Add
        </div>
        <div
          className={
            active === 1 ? "tags-modal-tab-active" : "tags-modal-tab-not-active"
          }
          onClick={() => setActive(1)}
        >
          Manage
        </div>
        <div
          className={
            active === 2 ? "tags-modal-tab-active" : "tags-modal-tab-not-active"
          }
          onClick={() => setActive(2)}
        >
          Create
        </div>
      </div>
      <div onClick={closeModal} className="tags-modal-head-exit">
        <FiX />
      </div>
    </div>
  );
};

export default TagsModalHead;
