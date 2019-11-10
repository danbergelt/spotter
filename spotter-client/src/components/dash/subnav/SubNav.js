import React from "react";
import SubnavDropdown from "./SubnavDropdown";
import { FiSettings } from "react-icons/fi";

const SubNav = () => {
  return (
    <div className="subnav-container">
      <div className="subnav-menu left">
        <SubnavDropdown />
        <div className="subnav-menu-icon left">
          <FiSettings />
        </div>
      </div>
      <div className="subnav-menu right">
        <p className="subnav-menu-icon right">View PRs</p>
      </div>
    </div>
  );
};

export default SubNav;
