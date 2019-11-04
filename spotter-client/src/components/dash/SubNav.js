import React from "react";
import SubnavDropdown from './SubnavDropdown';

const SubNav = () => {
  return (
    <div className="subnav-container">
      <div className="subnav-menu left">
        <SubnavDropdown className="subnav-menu-icon left" />
        <p className="subnav-menu-icon left">Workouts</p>
        <p className="subnav-menu-icon left">Exercises</p>
      </div>
      <div className="subnav-menu right">
        <p className="subnav-menu-icon right">PRs</p>
      </div>
    </div>
  );
};

export default SubNav;
