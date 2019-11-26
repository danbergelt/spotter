import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import Routes from "./Routes";
import { connect } from "react-redux";
import { addToken } from "./actions/addTokenActions";

const App = ({ addToken }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_T_API}/api/auth/refresh`, {
        withCredentials: true
      })
      .then(res => {
        addToken(res.data.token);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Loader
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        type="ThreeDots"
        color="#E9503F"
        height={50}
        width={250}
      />
    );
  }

  return <Routes />;
};

export default connect(null, { addToken })(App);
