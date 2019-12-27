import React, { memo } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  closeHandler: () => void;
}

const SaveTemplateHead: React.FC<Props> = ({ closeHandler }) => {
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
};

export default memo(SaveTemplateHead);
