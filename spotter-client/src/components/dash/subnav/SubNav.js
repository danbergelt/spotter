import React from "react";
import SubnavDropdown from "./SubnavDropdown";

const SubNav = () => {
  return (
    <div className="subnav-container">
      <div className="subnav-menu left">
        <SubnavDropdown />
        {/* <div className="subnav-menu-icon left">
          PRs
        </div> */}
      </div>
    </div>
  );
};

export default SubNav;
