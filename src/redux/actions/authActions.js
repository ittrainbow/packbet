import { 
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_ADMIN,
  SET_CURRENT_USER,
  GET_BUTTONSTATE,
  SET_BUTTONSTATE,
  SET_ANSWERS,
  SET_AUTH_PAGE
} from '../types'

import { findUser } from '../../frame/findUser'
import axios from 'axios'
import tableCreator from '../../frame/tableCreator'
import { actionCreateStandings } from './weekActions'
import { actionSwitchLoading } from './loadingActions'


export function actionAuth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    const authUrl = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC34nFbBcejRwO5_dY6kcUsRHlTuy9AHOI'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC34nFbBcejRwO5_dY6kcUsRHlTuy9AHOI'

      // https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC34nFbBcejRwO5_dY6kcUsRHlTuy9AHOI

    const dbUrl = 'https://packpredictor-default-rtdb.firebaseio.com/pack/'
    
    const authResponse = await axios.post(authUrl, authData)

    const weeksResponse = await axios.get(`${dbUrl}/weeks.json`)
    const usersResponse = await axios.get(`${dbUrl}/users.json`)
    const answersResponse = await axios.get(`${dbUrl}/answers.json`)
    const userId = findUser(usersResponse.data, email)[0]
    const isAdmin = authResponse.data.email === 'admin@admin.com'

    const answerState = actionCreateButtonsObj(answersResponse.data.weeks, weeksResponse.data)
    const buttonState = actionCreateButtonsObj(usersResponse.data[userId].weeks, weeksResponse.data)
    const expirationDate = new Date(new Date().getTime() + authResponse.data.expiresIn * 1000)

    if (!isLogin) {
      const table = tableCreator(usersResponse, answersResponse)
      await axios.put(`${dbUrl}/table.json`, table)
      dispatch(actionCreateStandings(table))
    }

    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(actionSetAdmin(isAdmin))
    dispatch(actionAuthSuccess(authResponse.data.idToken))
    dispatch(actionAutoLogout(authResponse.data.expiresIn))
    dispatch(actionSetAnswerState(answerState))
    dispatch(actionSetCurrentUser(userId, usersResponse.data[userId].name))

    isAdmin
      ? dispatch(actionGetButtonState(answerState))
      : dispatch(actionGetButtonState(buttonState))

    dispatch(actionSwitchLoading(false))
  }
}

export function actionCreateButtonsObj(buttons = 0, weeks) {
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

export function actionGetButtonState(buttonState) {
  return {
    type: GET_BUTTONSTATE,
    payload: buttonState
  }
}

export function actionSetAuthPage(boolean) {
  return {
    type: SET_AUTH_PAGE,
    payload: boolean
  }
}

export function actionSetAnswerState(answerState) {
  return {
    type: SET_ANSWERS,
    payload: answerState
  }
}

export function actionAuthSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    payload: token
  }
}

export function actionSetCurrentUser(id, name) {
  return {
    type: SET_CURRENT_USER,
    id: id,
    payload: name
  }
}

export function actionAutoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      dispatch(actionLogout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate <= new Date()) {
        dispatch(actionLogout())
      } else {        
        dispatch(actionAuthSuccess(token))
        dispatch(actionAutoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function actionAutoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(actionLogout())
    }, time * 1000)
  }
}

export function actionLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT,
  }
}

export function actionSetAdmin(value) {
  return {
    type: SET_ADMIN,
    payload: value
  }
}

export function actionButtonState(state) {
  return {
    type: SET_BUTTONSTATE,
    payload: state
  }
}
