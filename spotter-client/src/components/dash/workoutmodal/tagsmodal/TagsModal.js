import React, { useState } from "react";
import Modal from "react-modal";

import TagsModalHead from "./TagsModalHead";
import TagsModalCreate from "./TagsModalCreate";
import TagsModalManage from "./TagsModalManage";
import TagsModalDelete from "./TagsModalDelete";
import TagsModalAdd from "./TagsModalAdd";

import { styles } from "./localutils/tagsModalStyles";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const TagsModal = ({ state, modal, dispatch, types }) => {

  // sets the selected tag to be queued for deletion
  const [toDelete, setToDelete] = useState(null);

  return (
    <Modal
      style={styles}
      onRequestClose={() => dispatch({ type: types.CLOSE_TAG_MODAL })}
      contentLabel="Tags Modal"
      isOpen={modal}
    >
      <TagsModalHead
        state={state}
        dispatch={dispatch}
        types={types}
      />
      {state.active === 3 && (
        <TagsModalDelete
          toDelete={toDelete}
          dispatch={dispatch}
          types={types}
        />
      )}
      {state.active === 2 && <TagsModalCreate />}
      {state.active === 1 && (
        <TagsModalManage
          dispatch={dispatch}
          types={types}
          active={state.active}
          setToDelete={setToDelete}
        />
      )}
      {state.active === 0 && <TagsModalAdd />}
    </Modal>
  );
};

export default TagsModal;
