import React from "react";
import { FiX } from "react-icons/fi";

const TagsModalHead = ({ state, types, dispatch }) => {
  return (
    <div data-testid="tags-modal-head" className="tags-modal-head-container">
      <div className="tags-modal-head-tabs">
        <div
          className={
            state.active === 0 ? "tags-modal-tab-active" : "tags-modal-tab-not-active"
          }
          onClick={() => dispatch({type: types.SET_ACTIVE, payload: 0})}
        >
          Add
        </div>
        <div
          className={
            state.active === 1 ? "tags-modal-tab-active" : "tags-modal-tab-not-active"
          }
          onClick={() => dispatch({type: types.SET_ACTIVE, payload: 1})}
        >
          Manage
        </div>
        <div
          className={
            state.active === 2 ? "tags-modal-tab-active" : "tags-modal-tab-not-active"
          }
          onClick={() => dispatch({type: types.SET_ACTIVE, payload: 2})}
        >
          Create
        </div>
      </div>
      <div
        data-testid="close-tag-modal"
        onClick={() => dispatch({ type: types.CLOSE_TAG_MODAL })}
        className="tags-modal-head-exit"
      >
        <FiX />
      </div>
    </div>
  );
};

export default TagsModalHead;
