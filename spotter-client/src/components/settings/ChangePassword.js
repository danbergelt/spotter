import React from "react";
import Popover from "react-tiny-popover";
import ChangePasswordContent from "./ChangePasswordContent";

const ChangePassword = ({ changePassword, setChangePassword, children }) => {
  return (
    <Popover
      isOpen={changePassword}
      onClickOutside={() => setChangePassword(false)}
      content={<ChangePasswordContent setChangePassword={setChangePassword} />}
      align="start"
      position="bottom"
      containerClassName="change-password-popup"
    >
      {children}
    </Popover>
  );
};

export default ChangePassword;
