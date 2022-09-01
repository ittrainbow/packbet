import axios from "../../axios/axios"
import { 
  SEE_OTHER_USER, 
  SWITCH_YOURSELF,
  CLEAN_OTHER_USER
} from "../types"
import { actionCreateButtonsObj } from "./authActions"

export function actionGetOtherUsers(id, weeks) {
  console.log('action', id, weeks)
  return async dispatch => {
    const response = await axios.get(`pack/users/${id}.json`)
    const buttonState = actionCreateButtonsObj(response.data.weeks, weeks)

    dispatch(actionOtherButtonState(buttonState))
    dispatch(actionSwitchYourself(false))
  }
}

export function actionOtherButtonState(buttonState) {
  console.log(2, buttonState)
  return {
    type: SEE_OTHER_USER,
    payload: buttonState
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