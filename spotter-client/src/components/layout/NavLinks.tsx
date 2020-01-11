import React from 'react';
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchToken } from "../../types/State";
import { logOutAction } from "../../actions/globalActions";

const NavLinks: React.FC = () => {

  const token: string | null = useSelector(fetchToken);

  const dispatch = useDispatch();

  const logOut: () => Promise<void> = async () => {
    // clears refresh token and access token
    dispatch(logOutAction());
  };

  return (
    <nav className="spotter-nav-links">
    {!token && (
      <HashLink smooth to="/#about" className="spotter-nav-link">
        About
      </HashLink>
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
  </nav>
  )
}

export default NavLinks;