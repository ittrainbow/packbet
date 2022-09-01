import { 
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_ADMIN,
  SET_CURRENT_USER,
  GET_BUTTONSTATE,
  SET_BUTTONSTATE,
  SET_ANSWERS
} from '../types'

import { findUser } from '../../frame/findUser'
import axios from 'axios'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    const authUrl = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC34nFbBcejRwO5_dY6kcUsRHlTuy9AHOI'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC34nFbBcejRwO5_dY6kcUsRHlTuy9AHOI'

    const dbUrl = 'https://packpredictor-default-rtdb.firebaseio.com/pack/'
    
    const authResponse = await axios.post(authUrl, authData)

    const weeksResponse = await axios.get(`${dbUrl}/weeks.json`)
    const usersResponse = await axios.get(`${dbUrl}/users.json`)
    const answersResponse = await axios.get(`${dbUrl}/answers.json`)
    const userId = findUser(usersResponse.data, email)[0]
    const isAdmin = authResponse.data.email === 'admin@admin.com'

    const answerState = createButtonsObj(answersResponse.data.weeks, weeksResponse.data)
    const buttonState = createButtonsObj(usersResponse.data[userId].weeks, weeksResponse.data)
    const expirationDate = new Date(new Date().getTime() + authResponse.data.expiresIn * 1000)

    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(setAdmin(isAdmin))
    dispatch(authSuccess(authResponse.data.idToken))
    dispatch(autoLogout(authResponse.data.expiresIn))
    dispatch(setAnswerState(answerState))
    dispatch(setCurrentUser(userId, usersResponse.data[userId].name))

    isAdmin
      ? dispatch(getButtonState(answerState))
      : dispatch(getButtonState(buttonState))
  }
}

export function createButtonsObj(buttons = 0, weeks) {
  const buttonState = {}

  for (let i=0; i<Object.keys(weeks).length; i++) {
    const weeklyButtons = {}

    if (buttons[i]) {
      for (let j=0; j<buttons[i].length; j++) {
        weeklyButtons[j] = buttons[i][j] !== 0
          ? buttons[i][j]
          : null
      }
    } else {
      for (let j=0; j<weeks[Object.keys(weeks)[i]].questions.length; j++) {
        weeklyButtons[j] = null
      }
    }

    buttonState[i] = weeklyButtons
  }

  return buttonState
}

export function getButtonState(buttonState) {
  return {
    type: GET_BUTTONSTATE,
    buttonState: buttonState
  }
}

export function setAnswerState(answerState) {
  return {
    type: SET_ANSWERS,
    answerState: answerState
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token: token
  }
}

export function setCurrentUser(id, name) {
  return {
    type: SET_CURRENT_USER,
    id: id,
    name: name
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {        
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT,
  }
}

export function setAdmin(value) {
  return {
    type: SET_ADMIN,
    value: value
  }
}

export function actionButtonState(state) {
  return {
    type: SET_BUTTONSTATE,
    payload: state
  }
}
