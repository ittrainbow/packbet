import {
  SET_EDITOR_CURRENT_WEEK,
  SET_EDITOR_CURRENT_NAME,
  SET_EDITOR_CURRENT_QUESTION,
  SET_EDITOR_CURRENT_TOTAL,
  SET_EDITOR_CURRENT_ID,
  SET_EDITOR_CURRENT_DEADLINE,
  SET_EDITOR_QUESTIONS
} from '../types'

export function actionSetEditorCurrentWeek(currentWeek) {
  return {
    type: SET_EDITOR_CURRENT_WEEK,
    payload: currentWeek
  }
}

export function actionSetEditorCurrentName(currentName) {
  return {
    type: SET_EDITOR_CURRENT_NAME,
    payload: currentName
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