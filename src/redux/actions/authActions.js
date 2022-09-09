import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_ADMIN,
  INIT_BUTTONSTATE,
  GET_BUTTONSTATE,
  SET_BUTTONSTATE,
  SET_ANSWERSTATE,
  SET_LOADEDSTATE,
  SET_AUTH_PAGE,
  SET_EMAIL,
  SET_LOCAL_ID,
  SET_USER_NAME
} from '../types'

import axios from 'axios'
import tableCreator from '../../frame/tableCreator'
import { actionCreateStandings } from './weekActions'
import { actionSwitchLoading } from './loadingActions'
import { actionSetMessage } from './loadingActions'

export function actionAuth(email, password, isLogin, name) {
  return async (dispatch) => {
    try {
      const dbUrl = 'https://packpredictor-default-rtdb.firebaseio.com/pack/'
      const authData = { email, password, returnSecureToken: true }
      const key = process.env.REACT_APP_FIREBASE_API_KEY
  
      const authUrl = isLogin
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
  
      const authResponse = await axios.post(authUrl, authData)

      const localId = authResponse.data.localId
  
      if (!isLogin) await axios.put(`${dbUrl}/users/${localId}.json`, { name: name, weeks: '' })
  
      const usersResponse = await axios.get(`${dbUrl}/users.json`)
      const weeksResponse = await axios.get(`${dbUrl}/weeks.json`)
      const answersResponse = await axios.get(`${dbUrl}/answers.json`)
      const isAdmin = authResponse.data.email === 'admin@admin.com'
      const getWeeks = usersResponse.data[localId].weeks || ''
      const userName = isLogin ? usersResponse.data[authResponse.data.localId].name : name
  
      const answerState = actionCreateButtonsObj(answersResponse.data.weeks, weeksResponse.data)
      const buttonState = actionCreateButtonsObj(getWeeks, weeksResponse.data)
      const expirationDate = new Date(new Date().getTime() + authResponse.data.expiresIn * 1000)
  
      const table = tableCreator(usersResponse.data, answersResponse)
      await axios.put(`${dbUrl}/table.json`, table)
      dispatch(actionCreateStandings(table))
  
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
      localStorage.setItem('expirationDate', expirationDate)
  
      dispatch(actionSetAdmin(isAdmin))
      dispatch(actionSetUserName(userName))
      dispatch(actionAuthSuccess(authResponse.data.idToken))
      dispatch(actionAutoLogout(authResponse.data.expiresIn))
      dispatch(actionSetLocalId(authResponse.data.localId))
      dispatch(actionSetAnswerState(answerState))
  
      isAdmin
        ? dispatch(actionGetButtonState(answerState))
        : dispatch(actionGetButtonState(buttonState))
  
      dispatch(actionSwitchLoading(false))
    } catch (error) {
      if (!isLogin) dispatch(actionSetMessage('Вероятно, такой пользователь уже существует'))
      if (isLogin) dispatch(actionSetMessage('Проверьте правильность ввода логина и пароля'))
      setTimeout(() => dispatch(actionSetMessage('')), 3000)
      dispatch(actionSwitchLoading(false))
    }
  }
}

export function actionCreateButtonsObj(buttons = 0, weeks) {
  const buttonState = {}
  const length = Object.keys(weeks).map((el) => weeks[el].id)

  for (let i = 0; i < length.length; i++) {
    const weeklyButtons = {}
    const id = length[i]

    if (buttons[id]) {
      for (let j = 0; j < buttons[id].length; j++) {
        weeklyButtons[j] = buttons[id][j] !== 0 ? buttons[id][j] : null
      }
    } else {
      for (let j = 0; j < weeks[Object.keys(weeks)[i]].questions.length; j++)
        weeklyButtons[j] = null
    }

    buttonState[length[i]] = weeklyButtons
  }

  return buttonState
}

export function actionGetButtonState(buttonState) {
  return {
    type: GET_BUTTONSTATE,
    payload: buttonState
  }
}

export function actionSetUserName(name) {
  return {
    type: SET_USER_NAME,
    payload: name
  }
}

export function actionSetEmail(email) {
  return {
    type: SET_EMAIL,
    payload: email
  }
}

export function actionSetAuthPage(boolean) {
  return {
    type: SET_AUTH_PAGE,
    payload: boolean
  }
}

export function actionSetLocalId(id) {
  return {
    type: SET_LOCAL_ID,
    payload: id
  }
}

export function actionSetAnswerState(answerState) {
  return {
    type: SET_ANSWERSTATE,
    payload: answerState
  }
}

export function actionInitButtonState(state) {
  return {
    type: INIT_BUTTONSTATE,
    payload: state
  }
}

export function actionSetButtonState(buttonState) {
  return {
    type: SET_BUTTONSTATE,
    payload: buttonState
  }
}

export function actionSetLoadedState(loadedState) {
  return {
    type: SET_LOADEDSTATE,
    payload: loadedState
  }
}

export function actionAuthSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    payload: token
  }
}

export function actionAutoLogin() {
  return (dispatch) => {
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
  return (dispatch) => {
    setTimeout(() => {
      dispatch(actionLogout())
    }, time * 1000)
  }
}

export function actionLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('localId')
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT
  }
}

export function actionSetAdmin(value) {
  return {
    type: SET_ADMIN,
    payload: value
  }
}
