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
    </div>
  );
};

export default SubNav;
