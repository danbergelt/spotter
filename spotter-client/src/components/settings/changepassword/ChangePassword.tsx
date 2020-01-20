import React from 'react';
import Popover from 'react-tiny-popover';
import ChangePasswordContent from './ChangePasswordContent';

interface Props {
  changePassword: boolean;
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  children?: any; // eslint-disable-line
}

const ChangePassword: React.FC<Props> = ({
  changePassword,
  setChangePassword,
  children
}: Props) => {
  return (
    <Popover
      isOpen={changePassword}
      onClickOutside={(): void => setChangePassword(false)}
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
