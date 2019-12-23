import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
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
              <div className="pr" key={pr.name}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    // color-coding circle to indicate if a PR is recent or old
                    className={
                      (moment().diff(moment(pr.date, "MMM DD YYYY"), "days") <=
                        31 &&
                        "pr-circle lastMonth") ||
                      (31 <
                        moment().diff(moment(pr.date, "MMM DD YYYY"), "days") &&
                        moment().diff(moment(pr.date, "MMM DD YYYY"), "days") <=
                          365 &&
                        "pr-circle lastYear") ||
                      (moment().diff(moment(pr.date, "MMM DD YYYY"), "days") >
                        365 &&
                        "pr-circle allTime")
                    }
                  >
                    <FaCircle />
                  </div>
                  <div>{pr.name}</div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="pr-date">{pr.date}</div>
                  <div style={{ fontWeight: "bold" }}>{pr.pr}lbs</div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PrSection;
