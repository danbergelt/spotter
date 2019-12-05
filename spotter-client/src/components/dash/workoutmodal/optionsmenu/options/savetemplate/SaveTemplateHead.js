import React from "react";
import { FiX } from "react-icons/fi";

const SaveTemplateHead = React.memo(({ closeHandler }) => {
  return (
    <div className="save-template-header">
      <div className="save-template-title">Save Template</div>
      <div onClick={closeHandler} className="save-template-exit">
        <FiX
          data-testid="quit-template-save"
          style={{ display: "flex", alignItems: "center" }}
        />
      </div>
    </div>
  );
});

export default SaveTemplateHead;
