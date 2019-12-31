import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchToken } from "src/types/State";
import { logOutAction } from "src/actions/globalActions";

const Nav = () => {
  const token: string | null = useSelector(fetchToken);

  const dispatch = useDispatch();

  const logOut: () => Promise<void> = async () => {
    // clears refresh token and access token
    dispatch(logOutAction());
  };

  return (
    <nav className="spotter-nav spacer">
      <div className="spotter-nav-head">
        <Link data-testid="spotter" className="spotter-nav-head-logo" to={"/"}>
          spotter<span className="spot">.</span>
        </Link>
      </div>
      <div className="spotter-nav-links">
        {!token && (
          <Link to="/" className="spotter-nav-link">
            About
          </Link>
        )}
        {token && (
          <Link
            data-testid="settings"
            className="spotter-nav-link"
            to="/settings"
          >
            Settings
          </Link>
        )}
        {token && (
          <Link
            data-testid="logout"
            onClick={logOut}
            className="spotter-nav-link styled"
            to="/login"
          >
            Log Out{" "}
          </Link>
        )}
        {!token && (
          <Link
            data-testid="login"
            className="spotter-nav-link dashboard"
            to="/login"
          >
            Log In
          </Link>
        )}
        {!token && (
          <Link
            data-testid="signup"
            className="spotter-nav-link styled"
            to="/signup"
          >
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
