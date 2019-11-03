import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

const Nav = () => {

  const location = useLocation();

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [location.pathname])

  const logOut = () => localStorage.removeItem('token');

  return (
    <nav className="spotter-nav">
      <div className="spotter-nav-head">
        <Link data-testid="spotter" className="spotter-nav-head-logo" to="/">spotter<span className="spot">.</span></Link>
      </div>
      <div className="spotter-nav-links">
        <Link to="/" className="spotter-nav-link">About</Link>
        <Link to="/" className="spotter-nav-link">Contact</Link>
        {token && <Link onClick={logOut} className="spotter-nav-link styled" to="/">Log Out </Link>}
        {!token && <Link data-testid="login" className="spotter-nav-link" to="/login">Log In</Link>}
        {!token && <Link data-testid="signup" className="spotter-nav-link styled" to="/signup">Sign Up</Link>}
      </div>
    </nav>
  );
};

export default Nav;
