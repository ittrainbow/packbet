import { 
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_ADMIN,
  SET_CURRENT_USER
} from "../types";

import { findUser } from "../../frame/findUser";
import axios from "axios";

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    const url = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC34nFbBcejRwO5_dY6kcUsRHlTuy9AHOI'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC34nFbBcejRwO5_dY6kcUsRHlTuy9AHOI';

    const response = await axios.post(url, authData);
    const data = response.data;

    const users = await axios.get('https://packpredictor-default-rtdb.firebaseio.com/pack/users.json');
    const userId = findUser(users.data, email)[0];

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(setCurrentUser(userId, users.data[userId].name));
    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token: token
  };
}

export function setCurrentUser(id, name) {
  return {
    type: SET_CURRENT_USER,
    id: id,
    name: name
  };
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {        
        dispatch(authSuccess(token));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT,
  };
}

export function setAdmin() {
  return {
    type: SET_ADMIN
  };
}