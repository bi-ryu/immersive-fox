import {accessTokenKey, profileFirstName, refreshTokenKey, userEmail} from "./constants";
import jwt_decode from "jwt-decode";

export const getEnv = () => {
  if (window.location.host.includes('dev.immersive-fox')) {
    return 'dev'
  } else if (window.location.host.includes('immersive-fox')) {
    return 'prod'
  }
  return 'local'
}

export const hostURLs = {
  'dev': 'https://dev.api.immersive-fox.com',
  'prod': 'https://api.immersive-fox.com',
  'local': 'http://0.0.0.0:8000',
}

export const url = (path) => {
  const host = hostURLs[getEnv()]
  return `${host}${path}`
}

export const setAuthToken = (access_token, refresh_token, first_name=null, email=null) => {
    localStorage.setItem(accessTokenKey, access_token);
    localStorage.setItem(refreshTokenKey, refresh_token);
    if (first_name)
      localStorage.setItem(profileFirstName, first_name);

    if (email)
      localStorage.setItem(userEmail, email);
};

export const setDevToken = () => {
  localStorage.setItem('devLoggedIn', 'true')
}

export const isTokenExpired = (token) => {
  if (!token) {
    return true
  }
  const { exp } = jwt_decode(token);
  const expirationTime = (exp * 1000) - 60000;
  return Date.now() >= expirationTime
};

export const isUserLoggedIn = () => {
  return localStorage.getItem(accessTokenKey)
}

export const logOutUser = () => {
  localStorage.removeItem(accessTokenKey)
  localStorage.removeItem(refreshTokenKey)
}

export const showDevLogin = () => {
  return localStorage.getItem('devLoggedIn') !== 'true' &&
    window.location.host.includes(process.env.REACT_APP_DEV_LOGIN_HOST) && false
}

export const getNameAlphabets = (name) => {
  const alphaBets = []
  name.split(' ').forEach(x => {
    alphaBets.push(x[0])
  })
  return alphaBets
}

export const getVideoUrl = (video_id) => {
  return url(`/play/${video_id}`)
}

export const getUserData = () => {
  return {
    'name': localStorage.getItem(profileFirstName),
    'email': localStorage.getItem(userEmail),
  }
}

export const conditionalRender = (condition, returnOnTrue, returnOnFalse) => {
  return condition ? returnOnTrue : returnOnFalse
}