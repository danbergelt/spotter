import React, { useState } from "react";

const ForgotAndChangePass: React.FC = () => {

  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-title">Change Password</div>
      <label className="forgot-password-label">Password</label>
      <input
        placeholder="name@email.com"
        onChange={e => setNewPass(e.target.value)}
        value={newPass}
        className="forgot-password-input"
      />
      <label className="forgot-password-label">Confirm Password</label>
      <input
        placeholder="name@email.com"
        onChange={e => setConfirmPass(e.target.value)}
        value={confirmPass}
        className="forgot-password-input"
      />
      <div className="forgot-password-submit">Change Password</div>
    </div>
  );
};

export default ForgotAndChangePass;
