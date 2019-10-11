import React from 'react';

const Hero = () => {
  return (
    <section className="home-hero-container">
      <div className="home-hero-main">
        <p className="home-hero-main-text">Simple, intuitive, and straight to the <p className="home-hero-main-point">point.</p></p>
      </div>
      <div className="home-hero-sub">
        <p className="home-hero-sub-text">A <span className="home-hero-sub-text-highlight">weightlifting tracker</span> that includes what you need, and cuts the BS.</p>
      </div>
      <p className="home-hero-reg">Sign up</p>
    </section>
  )
}

export default Hero;