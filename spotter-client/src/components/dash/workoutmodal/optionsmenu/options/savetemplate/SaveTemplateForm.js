import React from "react";

const SaveTemplateForm = React.memo(
  ({ handleSubmit, setTempName, tempName }) => {
    return (
      <form id="save" className="template-form" onSubmit={e => handleSubmit(e)}>
        <input
          autoFocus
          value={tempName}
          placeholder="Template name (must be unique)"
          onChange={e => setTempName(e.target.value)}
          className="template-save-name"
        />
      </form>
    );
  }
);

export default SaveTemplateForm;
