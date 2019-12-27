import React, { useState, memo } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { styles } from "./utils/styles";
import SaveTemplateMsg from "./SaveTemplateMsg";
import SaveTemplateBtn from "./SaveTemplateBtn";
import SaveTemplateForm from "./SaveTemplateForm";
import SaveTemplateHead from "./SaveTemplateHead";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import { State, WorkoutReducer } from "src/types/State";

interface Props {
  close: (payload: boolean) => void;
}

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

// save template modal body, including call to save template

const SaveTemplate: React.FC<Props> = ({ close }) => {
  const fetchWorkout = (state: State) => state.workoutReducer;
  const workout: WorkoutReducer = useSelector(fetchWorkout);

  const fetchTemplateSave = (state: State) => state.optionsReducer.templateSave;
  const templateSave: boolean = useSelector(fetchTemplateSave);

  const fetchToken = (state: State) => state.globalReducer.t;
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

  // API call to save template for later use
  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void = async e => {
    e.preventDefault();
    try {
      await axiosWithAuth(t).post(
        `${process.env.REACT_APP_T_API}/api/auth/templates`,
        {
          name: tempName,
          title: workout.title,
          tags: workout.tags,
          notes: workout.notes,
          exercises: workout.exercises
        }
      );
      setTempName("");
      setMessage({ success: "Template created" });
    } catch (error) {
      if (error.response) {
        setMessage({ error: error.response.data.error });
      }
    }
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
        <SaveTemplateBtn handleSubmit={handleSubmit} />
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
