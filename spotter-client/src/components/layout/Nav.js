import React from "react";
import { useToken } from '../../hooks/useToken';
import { Link } from "react-router-dom";

const Nav = () => {

  const logOut = () => localStorage.removeItem("token");

  return (
    <nav className="spotter-nav">
      <div className="spotter-nav-head">
        <Link
          data-testid="spotter"
          className="spotter-nav-head-logo"
          to={"/"}
        >
          spotter<span className="spot">.</span>
        </Link>
      </div>
      <div className="spotter-nav-links">
        {!useToken() && <Link to="/" className="spotter-nav-link">
          About
        </Link>}
        {!useToken() && <Link to="/" className="spotter-nav-link">
          Contact
        </Link>}
        {useToken() && (
          <Link data-testid="dashboard" className="spotter-nav-link dashboard" to="/dashboard">
            Dashboard{" "}
          </Link>
        )}
        {useToken() && (
          <Link data-testid="logout" onClick={logOut} className="spotter-nav-link styled" to="/login">
            Log Out{" "}
          </Link>
        )}
        {!useToken() && (
          <Link data-testid="login" className="spotter-nav-link" to="/login">
            Log In
          </Link>
        )}
        {!useToken() && (
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