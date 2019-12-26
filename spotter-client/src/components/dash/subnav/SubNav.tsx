import React from "react";
import SubnavDropdown from "./SubnavDropdown";

const SubNav: React.FC = () => {
  return (
    <div className="subnav-container spacer">
      <div className="subnav-menu left">
        <SubnavDropdown />
      </div>
    </div>
  );
};

export default SubNav;
