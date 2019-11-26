import axios from "axios";
import { store } from "./store";

const axiosWithAuth = () => {
  const {
    tokenReducer: { t }
  } = store.getState();

  return axios.create({
    headers: {
      Authorization: `Bearer ${t}`
    },
    withCredentials: true
  });
};

export default axiosWithAuth;
