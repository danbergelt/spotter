import React from "react";
import { FiX } from "react-icons/fi";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";

const Template = React.memo(({ onDelete, active, template, setActive }) => {
  const deleteTemplate = async () => {
    await axiosWithAuth().delete(
      `${process.env.REACT_APP_T_API}/api/auth/templates/${template._id}`
    );
    onDelete(template._id);
  };

  return (
    <div key={template._id} className="template-container">
      <div
        onClick={() => setActive(template)}
        className={template._id === active._id ? "template active" : "template"}
      >
        {template.name}
      </div>
      <div
        onClick={deleteTemplate}
        className="template-delete"
        data-testid="template-delete"
      >
        <FiX />
      </div>
    </div>
  );
});

export default Template;
