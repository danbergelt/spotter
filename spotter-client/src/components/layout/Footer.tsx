import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      style={{ background: location.pathname === '/' ? '#f6f8f9' : 'white' }}
      className='spotter-footer'
    >
      <div className='spotter-footer-link'>
        Spotter © 2020. All Rights Reserved.
      </div>
    </nav>
  );
};

export default Footer;
