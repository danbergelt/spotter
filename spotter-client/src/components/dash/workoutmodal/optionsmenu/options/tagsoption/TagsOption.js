import React from "react";
import TagsModal from "./tagsmodal/TagsModal";
import { FiTag } from "react-icons/fi";
import { OPEN_TAG_MODAL } from "../../../../../../actions/optionsActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchTags } from "../../../../../../actions/tagsActions";

const Tags = ({ iconClass }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const t = useSelector(state => state.globalReducer.t);

  const openTagsModal = () => {
    dispatch({ type: OPEN_TAG_MODAL });
    dispatch(fetchTags(history, t));
  };

  return (
    <>
      <div
        onClick={openTagsModal}
        className="add-workout-options-button"
        data-testid="tags-modal"
      >
        <FiTag className={iconClass} /> Tags
      </div>
      <TagsModal />
    </>
  );
};

export default Tags;
