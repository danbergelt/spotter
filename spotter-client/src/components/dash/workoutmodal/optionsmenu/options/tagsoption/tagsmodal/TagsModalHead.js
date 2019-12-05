import React, { useCallback } from "react";
import { useDispatch } from 'react-redux'
import { FiX } from "react-icons/fi";
import { SET_ACTIVE } from '../../../../../../../actions/optionsActions';

const TagsModalHead = ({ active, closeTagModal }) => {
  const dispatch = useDispatch();

  const setActive = useCallback(id => {
    dispatch({ type: SET_ACTIVE, payload: id})
  }, [dispatch])

  return (
    <div data-testid="tags-modal-head" className="tags-modal-head-container">
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
      <div
        data-testid="close-tag-modal"
        onClick={closeTagModal}
        className="tags-modal-head-exit"
      >
        <FiX />
      </div>
    </div>
  );
};

export default TagsModalHead;
