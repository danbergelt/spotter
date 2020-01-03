import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import Pr from "./Pr";
import { Pr as P } from "src/types/Prs";
import { FiInfo } from "react-icons/fi";
import ReactTooltip from "react-tooltip";

let m = require("moment");
if ("default" in m) {
  m = m["default"];
}

interface Props {
  title: string;
  prs: any;
}

const PrSection: React.FC<Props> = ({ title, prs }) => {

  const [open, setOpen] = useState(true);
  const [hover, setHover] = useState(false);

  return (
    <div className="pr-section">
      <div className={open ? "pr-title open" : "pr-title closed"}>
        <div
          className="pr-spacer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <div className={hover ? "hover-pr-dropdown" : "pr-dropdown"}>
              <IoMdArrowDropdown />
            </div>
          ) : (
            <div className={hover ? "hover-pr-dropdown" : "pr-dropdown"}>
              <IoMdArrowDropright />
            </div>
          )}
          <div style={{ marginLeft: "1rem" }}>{title}</div>
        </div>
        {title === "Last Month" && (
          <div data-tip data-for="pr-info" className="pr-info">
            <FiInfo />
          </div>
        )}
        <ReactTooltip place="top" id="pr-info" effect="solid">
          <div style={{ width: "200px" }}>
            Save the exercises you want tracked, and we'll show your PRs
            on this page!
          </div>
        </ReactTooltip>
      </div>
      {open && (
        <div className="pr-section-box">
          {!prs.length && (
            <div className="no-prs">No PRs found in this range</div>
          )}
          {prs
            // sorting the prs by date (most recent comes first)
            .sort((a: P, b: P) =>
              m(b.date, "MMM DD YYYY").diff(m(a.date, "MMM DD YYYY"))
            )
            .map((pr: P) => (
              <Pr key={pr.name} pr={pr} />
            ))}
        </div>
      )}
    </div>
  );
};

export default PrSection;
