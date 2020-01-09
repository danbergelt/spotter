import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addTokenAction } from "src/actions/globalActions";

const ForgotAndChangePass: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const changePass = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setNewPass("");
    setConfirmPass("");
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_T_API}/api/auth/user/forgotpassword/${id}`,
        { newPass, confirmPass }
      );
      console.log(res);
      dispatch(addTokenAction(res.data.token));
      history.push("/dashboard");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-title">Change Password</div>
      <form onSubmit={e => changePass(e)}>
        <label className="forgot-password-label">New Password</label>
        <input
          type="password"
          placeholder="Pick a secure password..."
          onChange={e => setNewPass(e.target.value)}
          value={newPass}
          className="forgot-password-input"
        />
        <label className="forgot-password-label">Confirm New Password</label>
        <input
          type="password"
          placeholder="Confirm secure password..."
          onChange={e => setConfirmPass(e.target.value)}
          value={confirmPass}
          className="forgot-password-input"
        />
        <button style={{ outline: 0, border: 0 }} className="forgot-password-submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ForgotAndChangePass;
