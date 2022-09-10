import { SET_VIEW, TOGGLE_SIDEBAR, SET_TAB_ACTIVE } from "../types"

export function actionSetView(boolean) {
  return {
    type: SET_VIEW,
    payload: boolean
  }
}

export function actionSetTabActive(index) {
  return {
    type: SET_TAB_ACTIVE,
    payload: index
  }
}

export function actionToggleSidebar(boolean) {
  return {
    type: TOGGLE_SIDEBAR,
    payload: boolean
  }
}