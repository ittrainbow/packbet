import { SWITCH_LOADING, SET_MESSAGE } from '../types'

export function actionSwitchLoading(loading) {
  return {
    type: SWITCH_LOADING,
    payload: loading
  }
}

export function actionSetMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}
