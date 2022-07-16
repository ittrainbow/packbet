import { SET_VIEW, TOGGLE_SIDEBAR, SET_TAB_ACTIVE, SET_HEIGHT } from "../types"

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

export function actionSetHeight(height) {
  return {
    type: SET_HEIGHT,
    payload: height
  }
}

export function actionToggleSidebar(boolean) {
  return {
    type: TOGGLE_SIDEBAR,
    payload: boolean
  }
}