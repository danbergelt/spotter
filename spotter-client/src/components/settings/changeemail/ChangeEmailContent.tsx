import React from "react";
import { FiX } from "react-icons/fi";
import ChangeEmailForm from './ChangeEmailForm'

interface Props {
  setChangeEmail: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeEmailContent: React.FC<Props> = ({ setChangeEmail}) => {
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