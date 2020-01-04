import React, { useState } from "react";
import weeklyview from "../../assets/weeklyview.png";
import monthlyview from "../../assets/monthlyview.png";
import prpage from "../../assets/prpage.png"

const Features: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);

  const setImage = () => {
    if (selected === 0) {
      return weeklyview;
    } else if (selected === 1) {
      return monthlyview;
    } else {
      return prpage;
    }
  };

  return (
    <div className="features-container">
      <div className="features-tabs-container">
        <div className="features-title">Features</div>
        <div
          onMouseEnter={() => setSelected(0)}
          className={selected === 0 ? "feature selected" : "feature"}
        >
          Week View
        </div>
        <div
          onMouseEnter={() => setSelected(1)}
          className={selected === 1 ? "feature selected" : "feature"}
        >
          Month View
        </div>
        <div
          onMouseEnter={() => setSelected(2)}
          className={selected === 2 ? "feature selected" : "feature"}
        >
          PR Tracking
        </div>
      </div>
      <img className="features-img" src={setImage()} alt="Weekly View" />
    </div>
  );
};

export default Features;
