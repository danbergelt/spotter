import React from "react";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { FROM_TEMPLATE } from "../../../../../../actions/workoutActions";
import { Template } from "src/types/Template";

interface Props {
  active: Partial<Template>
  setActive: React.Dispatch<React.SetStateAction<{} | Template>>;
  set: string;
}

// button that does the generating
const GenerateTemplate: React.FC<Props> = ({
  active,
  setActive,
  set: SET_FROM_TEMPLATE
}) => {
  const dispatch = useDispatch();

  // handles state when new template is generated
  const genHandler = (template: Template | {}) => {
    // TS does not pick up on Lodash isEmpty, so need to pass in empty object as a union
    dispatch<{ type: string; payload: Template | {} }>({
      type: FROM_TEMPLATE,
      payload: template
    });
    dispatch<{ type: string; payload: boolean }>({
      type: SET_FROM_TEMPLATE,
      payload: false
    });
    setActive({});
  };

  return (
    <div
      onClick={() => (!isEmpty(active) ? genHandler(active) : null)}
      className="generate-template"
      data-testid="generate-template"
    >
      Generate
    </div>
  );
};

export default GenerateTemplate;
