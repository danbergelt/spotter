import React, { useCallback, memo } from "react";
import { useDispatch } from "react-redux";
import SaveTemplate from "./SaveTemplate";
import { FiSave } from "react-icons/fi";
import { SET_TEMPLATE_SAVE } from "../../../../../../actions/optionsActions";

interface Props {
  iconClass: string;
}

// option button container, click to trigger opening of save-template modal
const SaveTemplateOption: React.FC<Props> = ({ iconClass }) => {
  const dispatch = useDispatch();

  const setTemplateSaveModal: (payload: boolean) => void = useCallback(
    payload => {
      dispatch<{ type: string; payload: boolean }>({
        type: SET_TEMPLATE_SAVE,
        payload
      });
    },
    [dispatch]
  );

  return (
    <>
      <div
        onClick={() => setTemplateSaveModal(true)}
        data-testid="save-template"
        className="add-workout-options-button"
      >
        <FiSave className={iconClass} /> Template
      </div>
      <SaveTemplate close={setTemplateSaveModal} />
    </>
  );
};

export default memo(SaveTemplateOption);
