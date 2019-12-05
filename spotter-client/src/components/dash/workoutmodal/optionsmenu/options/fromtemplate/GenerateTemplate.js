import React from "react";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { FROM_TEMPLATE } from "../../../../../../actions/workoutActions";

const GenerateTemplate = ({ active, setActive, set }) => {

  const dispatch = useDispatch();

  // handles state when new template is generated
  const genHandler = template => {
    dispatch({ type: FROM_TEMPLATE, payload: template });
    dispatch({ type: set, payload: false });
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
