import React from "react";
import { FiX } from "react-icons/fi";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePasswordContent = ({ setChangePassword }) => {
  return (
    <div className="change-password-container">
      <div className="popover-head">
        <div
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
