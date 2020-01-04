import React, { useState, useEffect, Profiler } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import Routes from "./routes";
import { useDispatch } from "react-redux";
import { ADD_TOKEN } from "./actions/addTokenActions";

// this component renders in front of routes, checks for token, and returns proper authenticated data
// also requests refresh token on each refresh

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect((): void => {
    axios
      .get(`${process.env.REACT_APP_T_API}/api/auth/refresh`, {
        withCredentials: true
      })
      .then(res => {
        dispatch<{ type: string; payload: string | null }>({
          type: ADD_TOKEN,
          payload: res.data.token
        });
        setLoading(false);
      })
      .catch(err => console.log(err.response));
  }, [dispatch]);

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
    <div className="app-container">
      <Profiler
        id="app"
        onRender={(a, b, actualDuration, baseDuration) =>
          console.log(actualDuration)
        }
      >
        <Routes />
      </Profiler>
    </div>
  );
};

export default App;
