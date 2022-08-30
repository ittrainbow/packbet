import {
  SET_EDITOR_CURRENT_WEEK,
  SET_EDITOR_CURRENT_NAME,
  SET_EDITOR_CURRENT_QUESTION,
  SET_EDITOR_CURRENT_TOTAL,
  SET_EDITOR_CURRENT_ID,
  SET_EDITOR_CURRENT_DEADLINE,
  SET_EDITOR_QUESTIONS
} from '../types'

const initialState = {
  currentWeek: '',
  currentName: '',
  questions: [],
  currentQuestion: '',
  currentTotal: '',
  currentID: '',
  currentDeadline: ''
}

export default function editorReducer(state = initialState, action) {
  switch (action.type) {    
    
    case SET_EDITOR_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      }
      
    case SET_EDITOR_CURRENT_WEEK:
      return {
        ...state,
        currentWeek: action.currentWeek
      }
 
    case SET_EDITOR_CURRENT_NAME:
      return {
        ...state,
        currentName: action.currentName
      }
      
    case SET_EDITOR_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuestion
      }
      
    case SET_EDITOR_CURRENT_TOTAL:
      return {
        ...state,
        currentTotal: action.currentTotal
      }
      
    case SET_EDITOR_CURRENT_ID:
      return {
        ...state,
        currentID: action.currentID
      }

    case SET_EDITOR_CURRENT_DEADLINE:
      return {
        ...state,
        currentDeadline: action.currentDeadline
      }

    default:
      return state
  }
}