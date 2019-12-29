import React from "react";
import Popover from "react-tiny-popover";
import ChangeEmailContent from "./ChangeEmailContent";

interface Props {
  changeEmail: boolean;
  setChangeEmail: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
}

const ChangeEmail: React.FC<Props> = ({
  changeEmail,
  setChangeEmail,
  children
}) => {
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