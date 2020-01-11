import React, { useState, memo } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { styles } from "./utils/styles";
import SaveTemplateMsg from "./SaveTemplateMsg";
import SaveTemplateBtn from "./SaveTemplateBtn";
import SaveTemplateForm from "./SaveTemplateForm";
import SaveTemplateHead from "./SaveTemplateHead";
import { State, WorkoutReducer, fetchToken } from "src/types/State";
import { saveTemplateAction } from "src/actions/optionsActions";

interface Props {
  close: (payload: boolean) => void;
}

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

// save template modal body, including call to save template

const SaveTemplate: React.FC<Props> = ({ close }) => {
  const workout: WorkoutReducer = useSelector(
    (state: State) => state.workoutReducer
  );
  const templateSave: boolean = useSelector(
    (state: State) => state.optionsReducer.templateSave
  );

  const t: string | null = useSelector(fetchToken);

  const [tempName, setTempName] = useState<string>("");
  const [message, setMessage] = useState<{ success?: string; error?: string }>(
    {}
  );

  const closeHandler: () => void = () => {
    close(false);
    setMessage({});
    setTempName("");
  };

  // API call to save template
  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void = async e => {
    e.preventDefault();
    saveTemplateAction(t, tempName, workout, setTempName, setMessage);
  };

  return (
    <Modal
      style={styles}
      onRequestClose={closeHandler}
      contentLabel="Save Template"
      isOpen={templateSave}
    >
      <div className="save-template-container">
        <SaveTemplateHead closeHandler={closeHandler} />
        <SaveTemplateForm
          handleSubmit={handleSubmit}
          tempName={tempName}
          setTempName={setTempName}
        />
        <SaveTemplateBtn />
        {message.error && (
          <SaveTemplateMsg
            errOrSucc={"template-save error"}
            message={message.error}
            setMessage={setMessage}
          />
        )}
        {message.success && (
          <SaveTemplateMsg
            errOrSucc={"template-save success"}
            message={message.success}
            setMessage={setMessage}
          />
        )}
      </div>
    </Modal>
  );
};

export default memo(SaveTemplate);
