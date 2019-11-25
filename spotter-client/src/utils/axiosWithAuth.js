import axios from 'axios';
import secureStorage from './secureToken';

export const axiosWithAuth = () => {
  const token = secureStorage.getItem(`${process.env.REACT_APP_KEY}`);

  return axios.create({
    headers: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true
  })
}