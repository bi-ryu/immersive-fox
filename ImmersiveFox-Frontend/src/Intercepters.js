import axios from 'axios';
import {url, isTokenExpired} from './utils';
import {accessTokenKey, refreshTokenKey} from "./utils/constants";


const initialiseInterceptors = () => {
  const accessToken = localStorage.getItem(accessTokenKey);
  const refreshToken = localStorage.getItem(refreshTokenKey);

  if (isTokenExpired(refreshToken)) {
    localStorage.removeItem(accessTokenKey)
    localStorage.removeItem(refreshTokenKey)
  }

  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem(accessTokenKey);
      if (accessToken) {
        if (config.url.includes('storage.googleapis.com')) {
          // Do nothing
        } else {
          config.headers["Authorization"] = "Bearer " + accessToken;
        }
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        return Promise.reject(error);
      }

      const originalRequest = error.config;

      if (refreshToken && error.response.status === 401 && isTokenExpired(accessToken) && (!isTokenExpired(refreshToken))) {
        return axios
          .post(url('/token/refresh/'), {refresh: refreshToken})
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem(accessTokenKey, res.data.access);
              return axios(originalRequest);
            } else {
              localStorage.removeItem(accessTokenKey)
              localStorage.removeItem(refreshTokenKey)
            }
          });
      }
      return Promise.reject(error);
    }
  );
}

export default initialiseInterceptors;
