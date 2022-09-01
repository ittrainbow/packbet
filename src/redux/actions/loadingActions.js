import { SWITCH_LOADING } from "../types"

export function actionSwitchLoading(loading) {
  return {
    type: SWITCH_LOADING,
    payload: loading
  }
}