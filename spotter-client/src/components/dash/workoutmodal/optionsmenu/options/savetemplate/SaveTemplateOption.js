import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import SaveTemplate from "./SaveTemplate";
import { FiSave } from "react-icons/fi";
import { SET_TEMPLATE_SAVE } from '../../../../../../actions/optionsActions';

const SaveTemplateOption = React.memo(({ iconClass }) => {
  const dispatch = useDispatch();

  const setTemplateSaveModal = useCallback(payload => {
    dispatch({ type: SET_TEMPLATE_SAVE, payload })
  }, [dispatch])

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
});

export default SaveTemplateOption;
