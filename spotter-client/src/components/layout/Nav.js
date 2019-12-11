import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TOKEN } from "../../actions/addTokenActions";

const Nav = () => {
  const token = useSelector(state => state.globalReducer.t);

  const dispatch = useDispatch();

  const logOut = async () => {
    // clears refresh token and access token
    dispatch({ type: ADD_TOKEN, payload: null });
    await axios.get(`${process.env.REACT_APP_T_API}/api/auth/logout`, {
      withCredentials: true
    });
  };

  return (
    <nav className="spotter-nav">
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
            data-testid="dashboard"
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
