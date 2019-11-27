import React, { useState } from "react";
import Modal from "react-modal";

import TagsModalHead from "./TagsModalHead";
import TagsModalCreate from "./TagsModalCreate";
import TagsModalManage from "./TagsModalManage";
import TagsModalDelete from "./TagsModalDelete";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const TagsModal = ({ modal, closeModal, active, setActive }) => {
  const [toDelete, setToDelete] = useState(null);

  const customStyles = {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "325px",
      height: "325px",
      marginLeft: "60.5vw"
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
    </Modal>
  );
};

export default TagsModal;
