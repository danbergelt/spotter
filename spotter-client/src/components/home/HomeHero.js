import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="home-hero-container" style={{ margin: 0 }}>
      <div className="home-hero-main">
        <p className="home-hero-main-text">
          A{" "}
          <span className="home-hero-sub-text-highlight">lifting tracker</span>{" "}
          that includes what you need, and cuts the BS
        </p>
      </div>
      <div className="home-hero-sub">
        <div className="home-hero-sub-text">
          Stop living in Excel. Track your lifts, and have fun doing it.
        </div>
      </div>
      <Link to="/signup" className="home-hero-reg">
        Sign up
      </Link>
      <p className="home-hero-alt-signin">
        Already have an account?{" "}
        <Link to="/login" className="home-hero-alt-signin-link">
          Sign in.
        </Link>
      </p>
    </section>
  );
};

export default Hero;
