import React from "react";
import { FiEdit3, FiTarget, FiCalendar } from "react-icons/fi";

export const TextBlocks: React.FC = () => {
  const strokeWidth = { strokeWidth: 1.25 };

  return (
    <div className="textblocks-container">
      <div className="textblocks-title">
        Spotter is a lifting-focused fitness pal that helps you...
      </div>
      <div className="textblocks">
        <div className="textblock">
          <div className="textblock-icon track">
            <FiEdit3 style={strokeWidth} />
          </div>
          <div className="textblock-title">Track your lifts</div>
          <div className="textblock-content">
            Our dashboard{" "}
            <span className="textblock-highlight">
              automates your fitness journey
            </span>{" "}
            and makes tracking your lifts fun and easy.
          </div>
        </div>
        <div className="textblock">
          <div className="textblock-icon bests">
            <FiTarget style={strokeWidth} />
          </div>
          <div className="textblock-title">Log your personal bests</div>
          <div className="textblock-content">
            Save the exercises you want tracked, and we'll{" "}
            <span className="textblock-highlight">
              calculate your PRs automatically.
            </span>
          </div>
        </div>
        <div className="textblock">
          <div className="textblock-icon scale">
            <FiCalendar style={strokeWidth} />
          </div>
          <div className="textblock-title">Stay organized</div>
          <div className="textblock-content">
            Spreadsheets are unwieldy.{" "}
            <span className="textblock-highlight">Access, view, and edit</span>{" "}
            any of your workouts, with ease.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextBlocks;
