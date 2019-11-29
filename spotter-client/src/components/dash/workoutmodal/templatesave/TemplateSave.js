import React, { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { connect } from "react-redux";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const TemplateSave = ({ close, templateSave, workout }) => {
  const [tempName, setTempName] = useState("");
  const [message, setMessage] = useState({});

  const closeHandler = () => {
    close();
    setMessage({});
    setTempName("");
  };

  const customStyles = {
    overlay: {
      background: "transparent"
    },
    content: {
      width: "250px",
      height: "170px",
      marginLeft: "60.5vw",
      marginTop: "25vh"
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const transformed = workout.tags.map(el => {
      return { tag: el._id };
    });
    const exs = workout.exercises.map(el => {
      return { ...el, name: el.exercise };
    });
    try {
      await axiosWithAuth().post(
        `${process.env.REACT_APP_T_API}/api/auth/templates`,
        {
          name: tempName,
          title: workout.title,
          tags: transformed,
          notes: workout.notes,
          exercises: exs
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
      style={customStyles}
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
          onSubmit={e => handleSubmit(e)}
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
          onClick={e => handleSubmit(e)}
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
