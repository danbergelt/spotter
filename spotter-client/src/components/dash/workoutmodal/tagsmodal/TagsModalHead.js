import React from "react";
import { FiX } from 'react-icons/fi';

const TagsModalHead = () => {
  return (
    <div className="tags-modal-head-container">
      <div className="tags-modal-head-tabs">
        <div>Add</div>
        <div>Manage</div>
        <div>Create</div>
      </div>
      <div className="tags-modal-head-exit">
        <FiX />
      </div>
    </div>
  );
};

export default TagsModalHead;
