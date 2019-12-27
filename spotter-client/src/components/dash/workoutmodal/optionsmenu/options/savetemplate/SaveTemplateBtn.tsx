import React, { memo } from "react";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const SaveTemplateBtn: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <button
      data-testid="submit-template"
      className="template-save-submit"
      type="submit"
      form="save"
      // e reading as click event, not form event -> need to type e to "any" to avoid TS err
      onClick={(e: any) => handleSubmit(e)}
    >
      Save
    </button>
  );
};

export default memo(SaveTemplateBtn);
