import {
  SET_EDITOR_CURRENT_WEEK,
  SET_EDITOR_CURRENT_NAME,
  SET_EDITOR_CURRENT_QUESTION,
  SET_EDITOR_CURRENT_TOTAL,
  SET_EDITOR_CURRENT_ID,
  SET_EDITOR_CURRENT_DEADLINE,
  SET_EDITOR_QUESTIONS
} from '../types'

export function setEditorCurrentWeek(currentWeek) {
  return {
    type: SET_EDITOR_CURRENT_WEEK,
    currentWeek: currentWeek
  }
}

export function setEditorCurrentName(currentName) {
  return {
    type: SET_EDITOR_CURRENT_NAME,
    currentName: currentName
  }
}

export function setEditorCurrentQuestion(currentQuestion) {
  return {
    type: SET_EDITOR_CURRENT_QUESTION,
    currentQuestion: currentQuestion
  }
}

export function setEditorQuestions(questions) {
  return {
    type: SET_EDITOR_QUESTIONS,
    questions: questions
  }
}

export function setEditorCurrentTotal(currentTotal) {
  return {
    type: SET_EDITOR_CURRENT_TOTAL,
    currentTotal: currentTotal
  }
}

export function setEditorCurrentID(currentID) {
  return {
    type: SET_EDITOR_CURRENT_ID,
    currentID: currentID
  }
}

export function setEditorCurrentDeadline(currentDeadline) {
  return {
    type: SET_EDITOR_CURRENT_DEADLINE,
    currentDeadline: currentDeadline
  }
}