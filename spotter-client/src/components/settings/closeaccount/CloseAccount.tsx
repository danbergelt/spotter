import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToken } from "src/types/State";
import { closeAccountAction } from "src/actions/globalActions";
import { useHistory } from "react-router-dom";

const CloseAccount: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [confirmClose, setConfirmClose] = useState<boolean>(false);

  const t: string | null = useSelector(fetchToken);

  return (
    <div className="settings-section-alt">
      <span id="del-account-danger">Danger!</span> This action can't be undone.
      All of your data will be deleted, and you will be redirected to the Signup
      screen.
      <br />
      <br />
      <br />
      Are you sure you want to close your account?
      <div className="confirm-close">
        <input
          onChange={() => setConfirmClose(!confirmClose)}
          className="confirm-check"
          type="checkbox"
          data-testid="close-check"
        />
        <div>Yes, I'm sure</div>
      </div>
      <div
        data-testid={
          confirmClose ? "delete-account" : "delete-account-disabled"
        }
        className={confirmClose ? "delete-account" : "delete-account-disabled"}
        onClick={() => confirmClose && dispatch(closeAccountAction(t, history))}
      >
        Close Account
      </div>
    </div>
  );
};

export default CloseAccount;
