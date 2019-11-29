import React, { useState } from "react";
import Modal from "react-modal";

import TagsModalHead from "./TagsModalHead";
import TagsModalCreate from "./TagsModalCreate";
import TagsModalManage from "./TagsModalManage";
import TagsModalDelete from "./TagsModalDelete";
import TagsModalAdd from "./TagsModalAdd";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const TagsModal = ({ modal, closeModal, active, setActive }) => {
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
      onRequestClose={closeModal}
      contentLabel="Tags Modal"
      isOpen={modal}
    >
      <TagsModalHead
        closeModal={closeModal}
        active={active}
        setActive={setActive}
      />
      {active === 3 && (
        <TagsModalDelete toDelete={toDelete} setActive={setActive} />
      )}
      {active === 2 && <TagsModalCreate />}
      {active === 1 && (
        <TagsModalManage
          setActive={setActive}
          active={active}
          setToDelete={setToDelete}
        />
      )}
      {active === 0 && (
        <TagsModalAdd />
      )}
    </Modal>
  );
};

export default TagsModal;
