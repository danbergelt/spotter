import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { FiX } from "react-icons/fi";
import { SET_ACTIVE } from "../../../../../../../../actions/optionsActions";
import Tab from "./Tab";

interface Props {
  active: number;
  closeTagModal: () => void;
}

const TagsModalHead: React.FC<Props> = ({ active, closeTagModal }) => {
  const dispatch = useDispatch();

  const setActive: (id: number) => void = useCallback(
    id => {
      dispatch<{ type: string, payload: number }>({ type: SET_ACTIVE, payload: id });
    },
    [dispatch]
  );

  return (
    <div data-testid="tags-modal-head" className="tags-modal-head-container">
      <div className="tags-modal-head-tabs">
        <Tab active={active} setActive={setActive} text={"Add"} id={0} />
        <Tab active={active} setActive={setActive} text={"Manage"} id={1} />
        <Tab active={active} setActive={setActive} text={"Create"} id={2} />
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
