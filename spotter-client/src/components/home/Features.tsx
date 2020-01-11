import React, { useState } from "react";
import weeklyview from "../../assets/weeklyview.png";
import monthlyview from "../../assets/monthlyview.png";
import prpage from "../../assets/prpage.png";

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
    <article className="features-container">
      <section className="features-tabs-container">
        <p className="features-title">Features</p>
        <p
          onMouseEnter={() => setSelected(0)}
          className={selected === 0 ? "feature selected" : "feature"}
        >
          Week View
        </p>
        <p
          onMouseEnter={() => setSelected(1)}
          className={selected === 1 ? "feature selected" : "feature"}
        >
          Month View
        </p>
        <p
          onMouseEnter={() => setSelected(2)}
          className={selected === 2 ? "feature selected" : "feature"}
        >
          PR Tracking
        </p>
      </section>
      <img className="features-img" src={setImage()} alt="Weekly View" />
    </article>
  );
};

export default Features;
