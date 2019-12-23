import axios from "axios";
import { store } from "../index";

// gets token from memory, creates an axios instance sending the token, enables cookies

const axiosWithAuth = () => {
  const {
    globalReducer: { t }
  } = store.getState();

  return axios.create({
    headers: {
      Authorization: `Bearer ${t}`
    },
    withCredentials: true
  });
};

export default axiosWithAuth;
