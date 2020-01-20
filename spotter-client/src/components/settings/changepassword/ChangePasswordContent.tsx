import React from 'react';
import { FiX } from 'react-icons/fi';
import ChangePasswordForm from './ChangePasswordForm';

interface Props {
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordContent: React.FC<Props> = ({
  setChangePassword
}: Props) => {
  return (
    <article className='change-container'>
      <section className='popover-head'>
        <button
          type='button'
          data-testid='close-popover'
          onClick={(): void => setChangePassword(false)}
          className='close-popover'
        >
          <FiX />
        </button>
      </section>
      <ChangePasswordForm />
    </article>
  );
};

export default ChangePasswordContent;
