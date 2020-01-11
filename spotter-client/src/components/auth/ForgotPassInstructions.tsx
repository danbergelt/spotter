import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

const ForgotPasswordInstructions: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [res, setRes] = useState<{ err?: string; succ?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const sendInstructions = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setEmail("");
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_T_API}/api/auth/user/forgotpassword`,
        { email }
      );
      setLoading(false);
      setRes({ succ: "Email sent" });
    } catch (error) {
      setLoading(false);
      setRes({ err: error.response.data.error });
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-title">Forgot your password?</div>
      {res.err && <div className="forgot-password-res err">{res.err}</div>}
      {res.succ && <div className="forgot-password-res succ">{res.succ}</div>}
      <label className="forgot-password-label">Email</label>
      <form onSubmit={(e) => !loading && sendInstructions(e)}>
        <input
          placeholder="name@email.com"
          onChange={e => setEmail(e.target.value)}
          value={email}
          className="forgot-password-input"
        />
        <div
          onClick={() => !loading && sendInstructions()}
          className="forgot-password-submit"
        >
          {loading ? (
            <Loader type="ThreeDots" color="white" height={10} width={30} />
          ) : (
            "Send Instructions"
          )}
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordInstructions;
