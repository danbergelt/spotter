import React, { useState } from "react";
import ChangePassword from "../components/settings/changepassword/ChangePassword";
import ChangeEmail from "../components/settings/changeemail/ChangeEmail";
import { downloadData } from '../utils/dataDump';
import { useSelector } from "react-redux";
import { fetchToken } from "src/types/State";

const Settings: React.FC = () => {
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [changeEmail, setChangeEmail] = useState<boolean>(false);
  const [dataDump, setDataDump] = useState<string>("");

  const t: string | null = useSelector(fetchToken);

  return (
    <div className="settings-container spacer">
      <div className="settings-section">
        <div className="settings-head">Account Settings</div>
        <ChangePassword
          changePassword={changePassword}
          setChangePassword={setChangePassword}
        >
          <div
            onClick={() => setChangePassword(true)}
            className="settings-action"
          >
            Change password...
          </div>
        </ChangePassword>
        <ChangeEmail changeEmail={changeEmail} setChangeEmail={setChangeEmail}>
          <div onClick={() => setChangeEmail(true)} className="settings-action">
            Change email...
          </div>
        </ChangeEmail>
      </div>
      
      <div className="settings-section">
        <div className="settings-head">Exports</div>
        <div className="settings-del-confirm">
          Export your workout data as a CSV file. Click below to start your
          download.
          <div onClick={() => downloadData(setDataDump, t, "workouts")} className="export-data">
            Export Data
          </div>
          <p>{dataDump && dataDump}</p>
        </div>
      </div>

      {/* delete account, change email, and export data will be included in 1.2! :) */}

      <div className="settings-section">
        <div className="settings-head">Close Account</div>
        <div className="settings-del-confirm">
          <span id="del-account-danger">Danger!</span> This action can't be
          undone. All of your data will be deleted, and you will be redirected
          to the Signup screen.
          <br />
          <br />
          <br />
          Are you sure you want to delete your account?
          <div className="delete-account">Delete Account</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
