import React, { useState } from "react";
import Modal from "react-modal";

import TagsModalHead from "./TagsModalHead";
import TagsModalCreate from "./TagsModalCreate";
import TagsModalManage from "./TagsModalManage";
import TagsModalDelete from "./TagsModalDelete";
import TagsModalAdd from "./TagsModalAdd";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const TagsModal = ({ state, modal, dispatch, types }) => {
  const [toDelete, setToDelete] = useState(null);

  const customStyles = {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "325px",
      height: "330px",
      marginLeft: "60vw"
    }
  };

  return (
    <Modal
      style={customStyles}
      onRequestClose={() => dispatch({type: types.CLOSE_TAG_MODAL})}
      contentLabel="Tags Modal"
      isOpen={modal}
    >
      <TagsModalHead
        state={state}
        types={types}
        dispatch={dispatch}
        types={types}
        dispatch={dispatch}
      />
      {state.active === 3 && (
        <TagsModalDelete toDelete={toDelete} dispatch={dispatch} types={types} />
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
      {state.active === 0 && (
        <TagsModalAdd />
      )}
    </Modal>
  );
};

export default TagsModal;
