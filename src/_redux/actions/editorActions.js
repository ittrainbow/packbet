import {
  SET_EDITOR_CURRENT_WEEK,
  SET_EDITOR_CURRENT_WEEK_ID,
  SET_EDITOR_CURRENT_NAME,
  SET_EDITOR_CURRENT_QUESTION,
  SET_EDITOR_CURRENT_TOTAL,
  SET_EDITOR_CURRENT_ID,
  SET_EDITOR_CURRENT_DEADLINE,
  SET_EDITOR_QUESTIONS,
  SET_CURRENT_ERROR,
  SET_EDITOR_CURRENT_HASH,
  SET_EDITOR_FROM_WEEKLIST,
  SET_EDITOR_WEEK_ACTIVITY,
  CLEAR_EDITOR
} from '../types'

export function actionSetEditorCurrentWeek(currentWeek) {
  return {
    type: SET_EDITOR_CURRENT_WEEK,
    payload: currentWeek
  }
}

export function actionSetEditorCurrentError(errorMessage) {
  return {
    type: SET_CURRENT_ERROR,
    payload: errorMessage
  }
}

export function actionSetEditorCurrentName(currentName) {
  return {
    type: SET_EDITOR_CURRENT_NAME,
    payload: currentName
  }
}

export function actionSetCurrentWeekId(weekId) {
  return {
    type: SET_EDITOR_CURRENT_WEEK_ID,
    payload: weekId
  }
}

export function actionSetEditorCurrentQuestion(currentQuestion) {
  return {
    type: SET_EDITOR_CURRENT_QUESTION,
    payload: currentQuestion
  }
}

export function actionSetEditorQuestions(questions) {
  return {
    type: SET_EDITOR_QUESTIONS,
    payload: questions
  }
}

export function actionSetEditorCurrentTotal(currentTotal) {
  return {
    type: SET_EDITOR_CURRENT_TOTAL,
    payload: currentTotal
  }
}

export function actionSetEditorCurrentID(currentID) {
  return {
    type: SET_EDITOR_CURRENT_ID,
    payload: currentID
  }
}

export function actionSetEditorCurrentDeadline(currentDeadline) {
  return {
    type: SET_EDITOR_CURRENT_DEADLINE,
    payload: currentDeadline
  }
}

export function actionSetEditorCurrentHash(currentHash) {
  return {
    type: SET_EDITOR_CURRENT_HASH,
    payload: currentHash
  }
}

export function actionSetEditorWeekActivity(activity) {
  return {
    type: SET_EDITOR_WEEK_ACTIVITY,
    payload: activity
  }
}

export function actionClearEditor() {
  return {
    type: CLEAR_EDITOR
  }
}

export function actionSetEditorFromWeekList(week) {
  return {
    type: SET_EDITOR_FROM_WEEKLIST,
    payload: week
  }
}
