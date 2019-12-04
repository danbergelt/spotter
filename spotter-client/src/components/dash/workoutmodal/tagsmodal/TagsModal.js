import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import TagsModalHead from "./TagsModalHead";
import TagsModalCreate from "./TagsModalCreate";
import TagsModalManage from "./TagsModalManage";
import TagsModalDelete from "./TagsModalDelete";
import TagsModalAdd from "./TagsModalAdd";
import { CLOSE_TAG_MODAL } from "../../../../actions/optionsActions";
import { styles } from "./localutils/tagsModalStyles";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const TagsModal = () => {
  // sets the selected tag to be queued for deletion
  const [toDelete, setToDelete] = useState(null);

  const active = useSelector(state => state.optionsReducer.active);
  const modal = useSelector(state => state.optionsReducer.tagModal);
  const dispatch = useDispatch();
  const closeTagModal = useCallback(() => {
    dispatch({ type: CLOSE_TAG_MODAL });
  }, [dispatch]);

  return (
    <Modal
      style={
        active === 3
          ? { ...styles, content: { ...styles.content, height: "190px" } }
          : styles
      }
      onRequestClose={closeTagModal}
      contentLabel="Tags Modal"
      isOpen={modal}
    >
      <TagsModalHead active={active} closeTagModal={closeTagModal} />
      {active === 3 && <TagsModalDelete toDelete={toDelete} />}
      {active === 2 && <TagsModalCreate />}
      {active === 1 && <TagsModalManage setToDelete={setToDelete} />}
      {active === 0 && <TagsModalAdd />}
    </Modal>
  );
};

export default TagsModal;
