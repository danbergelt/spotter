import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useWindowSize } from "react-use";
import { styles } from './MobileMenuStyles';
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const Nav = () => {
  const { width } = useWindowSize();

  return (
    <div className="spotter-nav spacer">
      <section className="spotter-nav-head">
        <Link data-testid="spotter" className="spotter-nav-head-logo" to={"/"}>
          spotter<span className="spot">.</span>
        </Link>
      </section>
      {width <= 500 ? (
        <Menu right styles={styles}>
          <NavLinks />
        </Menu>
      ) : (
        <NavLinks />
      )}
    </div>
  );
};

export default Nav;
