import React from "react";
import Popover from "react-tiny-popover";
import ChangeEmailContent from "./ChangeEmailContent";

const ChangeEmail = ({ changeEmail, setChangeEmail, children }) => {
  return (
    <Popover
      isOpen={changeEmail}
      onClickOutside={() => setChangeEmail(false)}
      content={<ChangeEmailContent setChangeEmail={setChangeEmail} />}
      align="start"
      position="bottom"
      containerClassName="change-popup"
    >
      {children}
    </Popover>
  );
};

export default ChangeEmail;
