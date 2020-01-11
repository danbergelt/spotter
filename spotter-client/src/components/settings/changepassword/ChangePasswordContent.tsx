import React from "react";
import { FiX } from "react-icons/fi";
import ChangePasswordForm from "./ChangePasswordForm";

interface Props {
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordContent: React.FC<Props> = ({ setChangePassword }) => {
  return (
    <div className="change-container">
      <div className="popover-head">
        <div
          role="button"
          data-testid="close-popover"
          onClick={() => setChangePassword(false)}
          className="close-popover"
        >
          <FiX />
        </div>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordContent;
