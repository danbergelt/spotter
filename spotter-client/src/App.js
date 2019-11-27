import React, { useState, useEffect, Profiler } from "react";
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
  }, [addToken]);

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
        height={40}
        width={150}
      />
    );
  }

  return (
    <Profiler
      id="app"
      onRender={(a, b, actualDuration, baseDuration) =>
        console.log(actualDuration)
      }
    >
      <Routes />
    </Profiler>
  );
};

export default connect(null, { addToken })(App);
