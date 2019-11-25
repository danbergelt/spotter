import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import secureStorage from "../utils/secureToken";

export const useToken = () => {
  const location = useLocation();

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(secureStorage.getItem(`${process.env.REACT_APP_KEY}`));
  }, [location.pathname]);

  return token;
};
