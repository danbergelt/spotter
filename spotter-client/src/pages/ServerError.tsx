import React from "react";

const ServerError: React.FC = () => {
  return (
    <section className="notfound-container">
      <h1 className="notfound-header">500</h1>
      <p className="notfound-content">Server error. Please try again later</p>
    </section>
  );
};

export default ServerError;
