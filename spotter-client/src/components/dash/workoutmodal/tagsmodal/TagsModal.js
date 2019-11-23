import React, { useState } from "react";
import Modal from "react-modal";

import TagsModalHead from "./TagsModalHead";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const TagsModal = ({ modal, closeModal }) => {
  const customStyles = {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "300px",
      height: "275px",
      marginLeft: "60.5vw"
    }
  };

  const [active, setActive] = useState(0);

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
    </Modal>
  );
};

export default TagsModal;
