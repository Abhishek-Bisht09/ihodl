import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {urls} from '../utils/api';

const Api = axios.create({baseURL: urls.BASE_URL});
Api.interceptors.request.use(
  async config => {
    config.params = {...config.params};
    const token = await AsyncStorage.getItem('@access_token');
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (token) headers.Authorization = 'Bearer ' + token;
    config.headers = headers;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default Api;
