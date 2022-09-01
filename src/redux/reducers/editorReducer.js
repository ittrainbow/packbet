import {
  SET_EDITOR_CURRENT_WEEK,
  SET_EDITOR_CURRENT_NAME,
  SET_EDITOR_CURRENT_QUESTION,
  SET_EDITOR_CURRENT_TOTAL,
  SET_EDITOR_CURRENT_ID,
  SET_EDITOR_CURRENT_DEADLINE,
  SET_EDITOR_QUESTIONS,
  CLEAR_EDITOR
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
        questions: action.payload
      }
      
    case SET_EDITOR_CURRENT_WEEK:
      return {
        ...state,
        currentWeek: action.payload
      }
 
    case SET_EDITOR_CURRENT_NAME:
      return {
        ...state,
        currentName: action.payload
      }
      
    case SET_EDITOR_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload
      }
      
    case SET_EDITOR_CURRENT_TOTAL:
      return {
        ...state,
        currentTotal: action.payload
      }
      
    case SET_EDITOR_CURRENT_ID:
      return {
        ...state,
        currentID: action.payload
      }

    case SET_EDITOR_CURRENT_DEADLINE:
      return {
        ...state,
        currentDeadline: action.payload
      }

    case CLEAR_EDITOR:
      return {
        state: initialState
      }

    default:
      return state
  }
}