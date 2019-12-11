import React from "react";

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-section">
        <div className="settings-head">Account Settings</div>
        <div className="settings-action">Change password...</div>
      </div>
      <div className="settings-section">
        <div className="settings-head">Close Account</div>
        <div className="settings-del-confirm">
          <span id="del-account-danger">Danger!</span> This action can't be undone. All of your data will be deleted, and you
          will be redirected to the Signup screen.
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
