import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useWindowSize } from 'react-use';
import { styles } from './MobileMenuStyles';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

const Nav = () => {
  const { width }: { width: number } = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return width <= 500 ? (
    <div className='spacer' style={{ display: 'flex', alignItems: 'center' }}>
      <Menu
        isOpen={isOpen}
        onStateChange={state => setIsOpen(state.isOpen)}
        disableAutoFocus
        width={210}
        right
        styles={styles}
      >
        <div className='spotter-nav spacer'>
          <section className='spotter-nav-head'></section>
          <NavLinks isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </Menu>
      <Link data-testid='spotter' className='spotter-nav-head-logo' to={'/'}>
        spotter<span className='spot'>.</span>
      </Link>
    </div>
  ) : (
    <div className='spotter-nav spacer'>
      <section className='spotter-nav-head'>
        <Link data-testid='spotter' className='spotter-nav-head-logo' to={'/'}>
          spotter<span className='spot'>.</span>
        </Link>
      </section>
      <NavLinks />
    </div>
  );
};

export default Nav;
