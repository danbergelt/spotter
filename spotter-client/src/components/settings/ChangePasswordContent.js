import React from "react";
import { FiX } from 'react-icons/fi';

const ChangePasswordContent = ({ setChangePassword }) => {
  return (
    <div className="popover-head">
      <div>Change Password</div>
      <div
        data-testid="close-popover"
        onClick={() => setChangePassword(false)}
        className="close-popover"
      >
        <FiX />
      </div>
    </div>
  );
};

export default ChangePasswordContent;
