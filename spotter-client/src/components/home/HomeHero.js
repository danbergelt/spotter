import React from "react";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="home-hero-container">
      <div className="home-hero-main">
        <p className="home-hero-main-text">
          A{" "}
          <span className="home-hero-sub-text-highlight">fitness tracker</span>{" "}
          that includes what you need, and cuts the B.S.
        </p>
      </div>
      <div className="home-hero-sub">
        <div className="home-hero-sub-text">
          No bells and whistles, no needless features, no upselling. Just you, and your lifts.
        </div>
      </div>
      <p className="home-hero-reg">Sign up</p>
      <p className="home-hero-alt-signin">Already have an account? <span className="home-hero-alt-signin-link">Sign in.</span></p>
    </section>
  );
};

export default Hero;
