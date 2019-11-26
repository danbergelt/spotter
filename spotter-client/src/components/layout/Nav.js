import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import { addToken } from "../../actions/addTokenActions";

const Nav = ({ token, addToken }) => {

  const logOut = async () => {
    addToken(null);
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
        {!token && (
          <Link to="/" className="spotter-nav-link">
            Contact
          </Link>
        )}
        {token && (
          <Link
            data-testid="dashboard"
            className="spotter-nav-link dashboard"
            to="/dashboard"
          >
            Dashboard{" "}
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
          <Link data-testid="login" className="spotter-nav-link" to="/login">
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

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.t
  };
};

export default connect(mapStateToProps, { addToken })(Nav);
