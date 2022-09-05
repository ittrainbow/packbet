import {
  SET_RENDER,
  SET_RENDER_BUTTONS,
  NULLIFY_RENDER,
  SET_RENDER_BUTTONSTATE,
  SET_RENDER_ANSWERSTATE,
  SET_RENDER_LOADEDSTATE
} from '../types'

const initialState = {
  deadline: null,
  id: null,
  name: null,
  number: null,
  questions: null,
  buttons: null,
  answers: null,
  loaded: null
}

export default function renderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RENDER:
      return {
        ...state,
        deadline: action.payload.deadline,
        id: action.payload.id,
        name: action.payload.name,
        number: action.payload.number,
        questions: action.payload.questions
      }

    case SET_RENDER_BUTTONS:
      return {
        ...state,
        buttons: action.payload.buttons,
        answers: action.payload.answers,
        loaded: action.payload.buttons
      }

    case SET_RENDER_BUTTONSTATE:
      return {
        ...state,
        buttons: action.payload
      }

    case SET_RENDER_ANSWERSTATE:
      return {
        ...state,
        answers: action.payload
      }

    case SET_RENDER_LOADEDSTATE:
      return {
        ...state,
        loaded: action.payload
      }

    case NULLIFY_RENDER:
      return {
        deadline: null,
        id: null,
        name: null,
        number: null,
        questions: null,
        buttons: null,
        answers: null,
        loaded: null
      }

    default:
      return state
  }
}
