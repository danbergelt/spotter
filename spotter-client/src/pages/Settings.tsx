import React, { useState } from "react";
import ChangePassword from "../components/settings/changepassword/ChangePassword";
import ChangeEmail from "../components/settings/changeemail/ChangeEmail";
import axiosWithAuth from "src/utils/axiosWithAuth";
import { useSelector } from "react-redux";
import { fetchToken } from "src/types/State";

const Settings: React.FC = () => {
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [changeEmail, setChangeEmail] = useState<boolean>(false);

  const t: string | null = useSelector(fetchToken);

  const downloadWorkoutData = async () => {
    try {
      const res = await axiosWithAuth(t).get(
        `${process.env.REACT_APP_T_API}/api/auth/workouts/download`, {responseType: 'blob'}
      );
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `download-${Date.now()}.csv`);
      document.body.appendChild(link)
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="settings-head">Export Workout Data</div>
        <div className="settings-del-confirm">
          Export your workout data as a CSV file. Click below to start your
          download.
          <div onClick={() => downloadWorkoutData()} className="export-data">
            Export Data
          </div>
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
