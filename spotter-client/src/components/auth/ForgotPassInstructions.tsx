import React, { useState } from "react";

const ForgotPasswordInstructions: React.FC = () => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-title">Forgot your password?</div>
      <label className="forgot-password-label">Email</label>
      <input
        placeholder="name@email.com"
        onChange={e => setInput(e.target.value)}
        value={input}
        className="forgot-password-input"
      />
      <div className="forgot-password-submit">Send Instructions</div>
    </div>
  );
};

export default ForgotPasswordInstructions;
