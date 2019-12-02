import React, { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { connect } from "react-redux";
import { styles } from "./styles";
import { handleSubmit } from "./handleSubmit";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const TemplateSave = ({ dispatch, types, close, templateSave, workout }) => {
  const [tempName, setTempName] = useState("");
  const [message, setMessage] = useState({});

  const closeHandler = () => {
    close(dispatch, types, false);
    setMessage({});
    setTempName("");
  };

  return (
    <Modal
      style={styles}
      onRequestClose={close}
      contentLabel="Save Template"
      isOpen={templateSave}
    >
      <div className="save-template-container">
        <div className="save-template-header">
          <div className="save-template-title">Save Template</div>
          <div onClick={closeHandler} className="save-template-exit">
            <FiX
              data-testid="quit-template-save"
              style={{ display: "flex", alignItems: "center" }}
            />
          </div>
        </div>
        <form
          id="save"
          className="template-form"
          onSubmit={e =>
            handleSubmit(e, { tempName, workout, setTempName, setMessage })
          }
        >
          <input
            autoFocus
            value={tempName}
            placeholder="Template name (must be unique)"
            onChange={e => setTempName(e.target.value)}
            className="template-save-name"
          />
        </form>
        {message.error && (
          <div className="template-save error">
            {message.error}
            <div
              onClick={() => setMessage("")}
              style={{ fontSize: "1.2rem", cursor: "pointer" }}
            >
              <FiX />
            </div>
          </div>
        )}
        {message.success && (
          <div className="template-save success">
            {message.success}
            <div
              onClick={() => setMessage("")}
              style={{ fontSize: "1.2rem", cursor: "pointer" }}
            >
              <FiX />
            </div>
          </div>
        )}
        <button
          data-testid="submit-template"
          className="template-save-submit"
          type="submit"
          form="save"
          onClick={e =>
            handleSubmit(e, { tempName, workout, setTempName, setMessage })
          }
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    workout: state.workoutReducer
  };
};

export default connect(mapStateToProps, {})(TemplateSave);
