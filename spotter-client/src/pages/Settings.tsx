import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { fetchToken } from '../types/State';
import ExportWorkouts from '../components/settings/exports/ExportWorkouts';
import CloseAccount from '../components/settings/closeaccount/CloseAccount';
import ChangeEmail from '../components/settings/changeemail/ChangeEmail';
import ChangePassword from '../components/settings/changepassword/ChangePassword';

const Settings: React.FC = () => {
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [changeEmail, setChangeEmail] = useState<boolean>(false);

  const t: string | null = useSelector(fetchToken);

  return (
    // account settings
    // e.g. change password, change email
    <>
      <Helmet>
        <title>Settings | Spotter</title>
      </Helmet>
      <div className='settings-container spacer'>
        <section className='settings-section'>
          <p className='settings-head'>Account Settings</p>
          <ChangePassword
            changePassword={changePassword}
            setChangePassword={setChangePassword}
          >
            <button
              type='button'
              tabIndex={0}
              onClick={(): void => setChangePassword(true)}
              className='settings-action'
            >
              Change password...
            </button>
          </ChangePassword>
          <ChangeEmail
            changeEmail={changeEmail}
            setChangeEmail={setChangeEmail}
          >
            <button
              type='button'
              onClick={(): void => setChangeEmail(true)}
              className='settings-action'
            >
              Change email...
            </button>
          </ChangeEmail>
        </section>

        {/* export workout data as a CSV file */}
        <section className='settings-section'>
          <div className='settings-head'>Exports</div>
          <ExportWorkouts t={t} />
        </section>

        {/* delete account permanently
      will wipe all account-related details and send user to signup */}
        <section className='settings-section'>
          <p className='settings-head'>Close Account</p>
          <CloseAccount />
        </section>
      </div>
    </>
  );
};

export default Settings;
