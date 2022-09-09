import axios from '../../axios/axios'
import { SEE_OTHER_USER, SWITCH_YOURSELF, CLEAN_OTHER_USER, GET_OTHER_NAME } from '../types'
import { actionCreateButtonsObj } from './authActions'

export function actionGetOtherUsers(id, weeks) {
  return async (dispatch) => {
    const response = await axios.get(`pack/users/${id}.json`)
    const buttonState = actionCreateButtonsObj(response.data.weeks, weeks)

    dispatch(actionOtherButtonState(buttonState))
  }
}

export function actionOtherButtonState(buttons) {
  return {
    type: SEE_OTHER_USER,
    payload: buttons
  }
}

export function actionCleanOtherUser() {
  return {
    type: CLEAN_OTHER_USER
  }
}

export function actionSwitchYourself(boolean) {
  return {
    type: SWITCH_YOURSELF,
    payload: boolean
  }
}

export function actionGetOtherName(name) {
  return {
    type: GET_OTHER_NAME,
    payload: name
  }
}