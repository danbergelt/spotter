import React from "react";
import TagsModal from "./tagsmodal/TagsModal";
import { FiTag } from "react-icons/fi";
import { OPEN_TAG_MODAL } from "../../../../../../actions/optionsActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchTags } from "../../../../../../actions/tagsActions";
import { fetchToken } from "src/types/State";

interface Props {
  iconClass: string;
}

const Tags: React.FC<Props> = ({ iconClass }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const t: string | null = useSelector(fetchToken);

  const openTagsModal: () => void = () => {
    dispatch<{type: string}>({ type: OPEN_TAG_MODAL });
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
