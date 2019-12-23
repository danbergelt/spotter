import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import Pr from "./Pr";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const PrSection = ({ title, prs }) => {
  const [open, setOpen] = useState(false);
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
      </div>
      {open && (
        <div className="pr-section-box">
          {!prs.length && (
            <div className="no-prs">No PRs found in this range</div>
          )}
          {prs
            // sorting the prs by date (most recent comes first)
            .sort((a, b) =>
              moment(b.date, "MMM DD YYYY").diff(moment(a.date, "MMM DD YYYY"))
            )
            .map(pr => (
              <Pr key={pr.name} pr={pr} />
            ))}
        </div>
      )}
    </div>
  );
};

export default PrSection;
