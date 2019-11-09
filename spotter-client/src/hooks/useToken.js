import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useToken = () => {
  const location = useLocation();

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location.pathname]);

  return token;
}