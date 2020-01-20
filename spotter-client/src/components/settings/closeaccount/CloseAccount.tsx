import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch, AnyAction } from 'redux';
import { fetchToken } from '../../../types/State';
import { closeAccountAction } from '../../../actions/globalActions';

const CloseAccount: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [confirmClose, setConfirmClose] = useState<boolean>(false);

  const t: string | null = useSelector(fetchToken);

  return (
    <article className='del-account-container'>
      <span id='del-account-danger'>Danger!</span>
      This action can&#39;t be undone. All of your data will be deleted, and you
      will be redirected to the Signup screen.
      <br />
      <br />
      Are you sure you want to close your account?
      <section className='confirm-close'>
        <input
          onChange={(): void => setConfirmClose(!confirmClose)}
          className='confirm-check'
          type='checkbox'
          data-testid='close-check'
        />
        <p>Yes, I&#39;m sure</p>
      </section>
      <button
        type='button'
        data-testid={
          confirmClose ? 'delete-account' : 'delete-account-disabled'
        }
        className={confirmClose ? 'delete-account' : 'delete-account-disabled'}
        onClick={(): false | ((dispatch: Dispatch<AnyAction>) => void) =>
          confirmClose && dispatch(closeAccountAction(t, history))
        } // eslint-disable-line
      >
        Close Account
      </button>
    </article>
  );
};

export default CloseAccount;
