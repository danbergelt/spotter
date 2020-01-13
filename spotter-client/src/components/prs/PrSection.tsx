import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import Pr from "./Pr";
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
    <section className="pr-section">
      <div className={open ? "pr-title open" : "pr-title closed"}>
        <div
          role="button"
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
          <p style={{ width: "200px" }}>
            Save the exercises you want tracked, and we'll show your PRs on this
            page!
          </p>
        </ReactTooltip>
      </div>
      {open && (
        <section className="pr-section-box">
          {!prs.length && <p className="no-prs">No PRs found in this range</p>}
          {prs
            // sorting the prs by date (most recent comes first)
            .sort((a: any, b: any) =>
              m(b.prDate, "MMM DD YYYY").diff(m(a.prDate, "MMM DD YYYY"))
            )
            .map((pr: any) => (
              <Pr key={pr.name} pr={pr} />
            ))}
        </section>
      )}
    </section>
  );
};

export default PrSection;
