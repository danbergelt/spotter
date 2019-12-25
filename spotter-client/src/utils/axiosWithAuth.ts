import axios, { AxiosInstance } from "axios";

// gets token from memory, creates an axios instance sending the token, enables cookies

const axiosWithAuth = (t: string): AxiosInstance => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${t}`
    },
    withCredentials: true
  });
};

export default axiosWithAuth;
