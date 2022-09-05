import {  
  APP_INIT, 
  SET_WEEK_ID, 
  SET_CURRENT_WEEK,
  SET_EDITOR_STATUS,
  SET_STANDINGS
} from '../types'
import axios from 'axios'

export function actionInit(weeks) {
  return {
    type: APP_INIT,
    payload: weeks
  }
}

export function actionSetWeekId(weekId) {
  return {
    type: SET_WEEK_ID,
    payload: weekId
  }
}

export function actionCurrentWeek(currentWeek) {
  return {
    type: SET_CURRENT_WEEK,
    payload: currentWeek
  }
}

export function actionSetEditorStatus(status) {
  return {
    type: SET_EDITOR_STATUS,
    payload: status
  }
}

export function actionAuth() {
  return async dispatch => {    
    const tableResponse = await axios.get(`https://packpredictor-default-rtdb.firebaseio.com/pack/table.json`)
    
    dispatch(actionCreateStandings(tableResponse.data))
  }
}

export function actionCreateStandings(standings) {
  return {
    type: SET_STANDINGS,
    payload: standings
  }
}