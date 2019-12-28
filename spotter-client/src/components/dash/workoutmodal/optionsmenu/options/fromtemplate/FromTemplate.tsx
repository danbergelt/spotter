import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { SET_FROM_TEMPLATE } from "../../../../../../actions/optionsActions";
import Templates from "./Templates";
import FromTemplateHead from "./FromTemplateHead";
import GenerateTemplate from "./GenerateTemplate";
import { Template } from "../../../../../../types/Template";
import { State } from "src/types/State";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

// body for template generator

const FromTemplate: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState<Partial<Template>>({});

  // true/false modal state
  const fromTemplateState = (state: State) => state.optionsReducer.fromTemplate;
  const fromTemplate: boolean = useSelector(fromTemplateState);

  const dispatch = useDispatch();

  // resets state when modal is closed
  const closeHandler: () => void = useCallback(() => {
    dispatch<{ type: string; payload: boolean }>({
      type: SET_FROM_TEMPLATE,
      payload: false
    });
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
