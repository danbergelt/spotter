import React from 'react';
import Popover from 'react-tiny-popover';
import ChangePasswordContent from './ChangePasswordContent';

interface Props {
  changePassword: boolean;
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
}

const ChangePassword: React.FC<Props> = ({
  changePassword,
  setChangePassword,
  children
}) => {
  return (
    <Popover
      isOpen={changePassword}
      onClickOutside={() => setChangePassword(false)}
      content={<ChangePasswordContent setChangePassword={setChangePassword} />}
      align='start'
      position='bottom'
      containerClassName='change-popup'
    >
      {children}
    </Popover>
  );
};

export default ChangePassword;
