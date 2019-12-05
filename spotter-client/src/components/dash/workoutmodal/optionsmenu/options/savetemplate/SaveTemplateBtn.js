import React from "react";

const SaveTemplateBtn = React.memo(({ handleSubmit }) => {
  return (
    <button
      data-testid="submit-template"
      className="template-save-submit"
      type="submit"
      form="save"
      onClick={e => handleSubmit(e)}
    >
      Save
    </button>
  );
});

export default SaveTemplateBtn;
