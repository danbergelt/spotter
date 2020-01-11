import React, { useState } from "react";
import ChangePassword from "../components/settings/changepassword/ChangePassword";
import ChangeEmail from "../components/settings/changeemail/ChangeEmail";
import { useSelector } from "react-redux";
import { fetchToken } from "src/types/State";
import ExportWorkouts from "src/components/settings/exports/ExportWorkouts";
import CloseAccount from "src/components/settings/closeaccount/CloseAccount";

const Settings: React.FC = () => {
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [changeEmail, setChangeEmail] = useState<boolean>(false);

  const t: string | null = useSelector(fetchToken);

  return (
    // account settings
    // e.g. change password, change email
    <div className="settings-container spacer">
      <div className="settings-section">
        <div className="settings-head">Account Settings</div>
        <ChangePassword
          changePassword={changePassword}
          setChangePassword={setChangePassword}
        >
          <div
            role="button"
            onClick={() => setChangePassword(true)}
            className="settings-action"
          >
            Change password...
          </div>
        </ChangePassword>
        <ChangeEmail changeEmail={changeEmail} setChangeEmail={setChangeEmail}>
          <div
            role="button"
            onClick={() => setChangeEmail(true)}
            className="settings-action"
          >
            Change email...
          </div>
        </ChangeEmail>
      </div>

      {/* export workout data as a CSV file */}
      <div className="settings-section">
        <div className="settings-head">Exports</div>
        <ExportWorkouts t={t} />
      </div>

      {/* delete account permanently
      will wipe all account-related details and send user to signup */}
      <div className="settings-section">
        <div className="settings-head">Close Account</div>
        <CloseAccount />
      </div>
    </div>
  );
};

export default Settings;
