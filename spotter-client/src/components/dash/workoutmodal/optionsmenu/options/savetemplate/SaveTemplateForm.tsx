import React, { memo } from "react";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setTempName: React.Dispatch<React.SetStateAction<string>>;
  tempName: string;
}

const SaveTemplateForm: React.FC<Props> = ({
  handleSubmit,
  setTempName,
  tempName
}) => {
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
};

export default memo(SaveTemplateForm);