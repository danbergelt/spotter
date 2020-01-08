import React from "react";
import { Link } from "react-router-dom";

const BottomCta: React.FC = () => {
  return (
    <div className="bottomcta-container">
      <div className="bottomcta-title">Log your first workout</div>
      <Link
        className="bottomcta-cta"
        style={{ color: "white", textDecoration: "none" }}
        to="/signup"
      >
        Get Tracking
      </Link>
    </div>
  );
};

export default BottomCta;
