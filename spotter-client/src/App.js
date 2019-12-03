import React, { useState, useEffect, Profiler, useCallback } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import Routes from "./routes";
import { useDispatch } from "react-redux";
import { ADD_TOKEN } from "./actions/addTokenActions";

// this component renders in front of routes, checks for token, and returns proper authenticated data
// also requests refresh token on each refresh

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const addToken = useCallback(
    t => {
      dispatch({ type: ADD_TOKEN, payload: t });
    },
    [dispatch]
  );

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
    // <Profiler
    //   id="app"
    //   onRender={(a, b, actualDuration, baseDuration) =>
    //     console.log(actualDuration)
    //   }
    // >
    <Routes />
    // </Profiler>
  );
};

export default App;
