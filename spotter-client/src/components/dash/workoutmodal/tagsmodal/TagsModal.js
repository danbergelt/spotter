import React from "react";
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
      height: "200px",
      marginLeft: '52.25vw'
    }
  };

  return (
    <Modal style={customStyles} contentLabel="Tags Modal" isOpen={modal}>
      <TagsModalHead />
    </Modal>
  );
};

export default TagsModal;
