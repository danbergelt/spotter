import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addTokenAction } from "src/actions/globalActions";
import Loader from "react-loader-spinner";

// hidden page that allows a user to change their password when forgotten
// accessed via link sent out through mailgun
// param is their reset password token


// CODE SMELL
// handling a lot of stuff manually here, 
// consider refactoring to something like Formik for automation
const ForgotAndChangePass: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [res, setRes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const changePass = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setLoading(true);
    setNewPassword("");
    setConfirmPassword("");
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_T_API}/api/auth/user/forgotpassword/${id}`,
        { newPassword, confirmPassword }
      );
      dispatch(addTokenAction(res.data.token));
      history.push("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setRes(error.response.data.error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-title">Change Password</div>
      {res && (
        <div style={{ marginTop: "2rem" }} className="forgot-password-res err">
          {res}
        </div>
      )}
      <form onSubmit={e => !loading && changePass(e)}>
        <label className="forgot-password-label">New Password</label>
        <input
          type="password"
          placeholder="Pick a secure password..."
          onChange={e => setNewPassword(e.target.value)}
          value={newPassword}
          className="forgot-password-input"
        />
        <label className="forgot-password-label">Confirm New Password</label>
        <input
          type="password"
          placeholder="Confirm secure password..."
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          className="forgot-password-input"
        />
        <button
          style={{ outline: 0, border: 0 }}
          className="forgot-password-submit"
        >
          {loading ? (
            <Loader type="ThreeDots" color="white" height={10} width={30} />
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotAndChangePass;
