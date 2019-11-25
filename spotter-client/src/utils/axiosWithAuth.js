import axios from 'axios';
import secureStorage from './secureToken';
import store from '../index';

const axiosWithAuth = () => {

  const { tokenReducer: { t } } = store.getState();

  return axios.create({
    headers: {
      'Authorization': `Bearer ${t}`
    },
    withCredentials: true
  })
}

export default axiosWithAuth