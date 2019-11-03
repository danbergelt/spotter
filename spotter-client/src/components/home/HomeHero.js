import React from 'react';

const Hero = () => {
  return (
    <section className="home-hero-container">
      <div className="home-hero-main">
        <div className="home-hero-main-text">Simple, intuitive, and straight to the <div className="home-hero-main-point">point.</div></div>
      </div>
      <div className="home-hero-sub">
        <p className="home-hero-sub-text">A <span className="home-hero-sub-text-highlight">fitness tracker</span> that includes what you need, and cuts the B.S.</p>
      </div>
      <p className="home-hero-reg">Sign up</p>
    </section>
  )
}

export default Hero;