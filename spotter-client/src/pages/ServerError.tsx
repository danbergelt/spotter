import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchToken } from "src/types/State";

const ServerError: React.FC = () => {
  const history = useHistory();
  const t = useSelector(fetchToken)

  useEffect(() => {
    if (t) history.push("/")
  }, [t, history])

  return (
    <section className="notfound-container">
      <h1 className="notfound-header">500</h1>
      <p className="notfound-content">Server error. Please try again later</p>
    </section>
  );
};

export default ServerError;
