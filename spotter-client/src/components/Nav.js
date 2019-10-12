import React from "react";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="spotter-nav">
      <div className="spotter-nav-head">
        <Link className="spotter-nav-head-logo" to="/">spotter</Link>
      </div>
      <div className="spotter-nav-links">
        <Link to="/" className="spotter-nav-link">About</Link>
        <Link to="/" className="spotter-nav-link">Contact</Link>
        <Link className="spotter-nav-link" to="/login">Log In</Link>
        <Link className="spotter-nav-link" to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Nav;
