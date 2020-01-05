import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-title">Forgot your password?</div>
      <label className="forgot-password-label">Email Address</label>
      <input
        onChange={e => setInput(e.target.value)}
        value={input}
        className="forgot-password-input"
      />
      <div className="forgot-password-submit">Send Me Instructions</div>
    </div>
  );
};

export default ForgotPassword;
