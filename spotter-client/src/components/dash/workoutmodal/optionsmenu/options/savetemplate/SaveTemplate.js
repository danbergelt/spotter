import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { styles } from "./utils/styles";
import SaveTemplateMsg from "./SaveTemplateMsg";
import SaveTemplateBtn from "./SaveTemplateBtn";
import SaveTemplateForm from "./SaveTemplateForm";
import SaveTemplateHead from "./SaveTemplateHead";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

// save template modal body, including call to save template

const SaveTemplate = React.memo(({ close }) => {
  const workout = useSelector(state => state.workoutReducer);
  const templateSave = useSelector(state => state.optionsReducer.templateSave);

  const [tempName, setTempName] = useState("");
  const [message, setMessage] = useState({});

  const closeHandler = () => {
    close(false);
    setMessage({});
    setTempName("");
  };

  // API call to save template for later use
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axiosWithAuth().post(
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
});

export default SaveTemplate;
