import React, { useState } from "react";
import ChangePassword from "../components/settings/changepassword/ChangePassword";

const Settings = () => {
  const [changePassword, setChangePassword] = useState(false);

  return (
    <div className="settings-container">
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
      </div>
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
