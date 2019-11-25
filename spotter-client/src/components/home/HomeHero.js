import React from "react";

const Hero = () => {
  return (
    <section className="home-hero-container">
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
      <p className="home-hero-reg">Sign up</p>
      <p className="home-hero-alt-signin">Already have an account? <span className="home-hero-alt-signin-link">Sign in.</span></p>
    </section>
  );
};

export default Hero;
