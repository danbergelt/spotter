import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { SET_FROM_TEMPLATE } from "../../../../../../actions/optionsActions";
import Templates from "./Templates";
import FromTemplateHead from "./FromTemplateHead";
import GenerateTemplate from "./GenerateTemplate";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

// body for template generator

const FromTemplate = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState({});

  // true/false modal state
  const fromTemplate = useSelector(state => state.optionsReducer.fromTemplate);

  const dispatch = useDispatch();

  // resets state when modal is closed
  const closeHandler = useCallback(() => {
    dispatch({ type: SET_FROM_TEMPLATE, payload: false });
    setActive({});
    setSearch("");
  }, [dispatch]);

  return (
    <Modal
      style={styles}
      isOpen={fromTemplate}
      onRequestClose={closeHandler}
      contentLabel="Generate Template"
    >
      <div className="from-template-container">
        <FromTemplateHead
          closeHandler={closeHandler}
          search={search}
          setSearch={setSearch}
        />
        <Templates search={search} active={active} setActive={setActive} />
        <GenerateTemplate
          active={active}
          setActive={setActive}
          set={SET_FROM_TEMPLATE}
        />
      </div>
    </Modal>
  );
};

export default FromTemplate;
