import {  
  APP_INIT, 
  SET_WEEK_ID, 
  SET_CURRENT_WEEK
} from '../types';

export function actionInit(weeks) {
  return {
    type: APP_INIT,
    payload: weeks
  };
}

export function actionWeekId(weekId) {
  return {
    type: SET_WEEK_ID,
    payload: weekId
  };
}

export function actionCurrentWeek(currentWeek) {
  return {
    type: SET_CURRENT_WEEK,
    payload: currentWeek
  };
}



