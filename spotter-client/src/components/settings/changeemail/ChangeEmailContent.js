import React from "react";
import { FiX } from "react-icons/fi";
import ChangeEmailForm from './ChangeEmailForm'

const ChangeEmailContent = ({ setChangeEmail}) => {
  return (
    <div className="change-container">
      <div className="popover-head">
        <div
          data-testid="close-popover"
          onClick={() => setChangeEmail(false)}
          className="close-popover"
        >
          <FiX />
        </div>
      </div>
      <ChangeEmailForm />
    </div>
  );
};

export default ChangeEmailContent;