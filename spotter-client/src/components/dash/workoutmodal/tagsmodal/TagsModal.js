import React, { useState } from "react";
import Modal from "react-modal";

import TagsModalHead from "./TagsModalHead";
import TagsModalCreate from "./TagsModalCreate";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const TagsModal = ({ modal, closeModal }) => {
  const customStyles = {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "300px",
      height: "300px",
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
      {active === 2 && <TagsModalCreate />}
    </Modal>
  );
};

export default TagsModal;
