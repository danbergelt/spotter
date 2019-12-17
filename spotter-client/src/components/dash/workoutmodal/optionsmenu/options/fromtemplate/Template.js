import React from "react";
import { FiX } from "react-icons/fi";

const Template = React.memo(
  ({ deleteTemplate, active, template, setActive }) => {
    return (
      <div key={template._id} className="template-container">
        <div
          onClick={() => setActive(template)}
          className={
            template._id === active._id ? "template active" : "template"
          }
        >
          {template.name}
        </div>
        <div
          onClick={() => deleteTemplate(template._id)}
          className="template-delete"
          data-testid="template-delete"
        >
          <FiX />
        </div>
      </div>
    );
  }
);

export default Template;
