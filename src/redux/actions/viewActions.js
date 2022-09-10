import { SET_VIEW, TOGGLE_SIDEBAR } from "../types"

export function actionSetView(boolean) {
  return {
    type: SET_VIEW,
    payload: boolean
  }
}

export function actionToggleSidebar(boolean) {
  return {
    type: TOGGLE_SIDEBAR,
    payload: boolean
  }
}