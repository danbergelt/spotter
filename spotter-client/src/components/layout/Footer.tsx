import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      style={{ background: location.pathname === '/' ? '#f6f8f9' : 'white' }}
      className="spotter-footer"
    >
      <a
        href="https://github.com/danbergelt/spotter"
        className="spotter-footer-link"
      >
        Code
      </a>
      <a href="mailto:team@getspotter.io" className="spotter-footer-link">
        Contact
      </a>
    </nav>
  );
};

export default Footer;
