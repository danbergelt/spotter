import React from "react";
import image from "../../assets/imagetext.png";
import { Link } from "react-router-dom";

const ImageText: React.FC = () => {
  return (
    <div className="imagetext-container">
      <div>
        <img className="imagetext-image" src={image} alt="Dashboard View" />
      </div>
      <div className="imagetext-content-container">
        <div className="imagetext-title">
          For people who lift, by people who lift
        </div>
        <div className="imagetext-text">
          Excel is a drag, tracking by hand is unsustainable, and other apps are
          bloated with unnecessary features.
        </div>
        <div className="imagetext-text">
          With Spotter, tracking your lifts has never been easier.
        </div>
          <Link className="imagetext-cta" to="/signup">
            Get Tracking
          </Link>
      </div>
    </div>
  );
};

export default ImageText;
