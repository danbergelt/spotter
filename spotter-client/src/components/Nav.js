import React from "react";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="spotter-nav">
      <div className="spotter-nav-head">
        <Link data-testid="spotter" className="spotter-nav-head-logo" to="/">spotter</Link>
      </div>
      <div className="spotter-nav-links">
        <Link to="/" className="spotter-nav-link">About</Link>
        <Link to="/" className="spotter-nav-link">Contact</Link>
        <Link data-testid="login" className="spotter-nav-link" to="/login">Log In</Link>
        <Link data-testid="signup" className="spotter-nav-link" to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Nav;
