import { 
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_ADMIN,
  SET_CURRENT_USER,
  GET_BUTTONSTATE,
  SET_BUTTONSTATE,
  SET_ANSWERSTATE,
  SET_LOADEDSTATE,
  SET_AUTH_PAGE,
  SET_EMAIL,
  INIT_BUTTONSTATE
} from '../types'

const initialState = {
  token: null,
  userName: null,
  email: '',
  userId: null,
  isAdmin: false,
  authPage: true
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload
      }
    
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: action.payload
      }

    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    
    case GET_BUTTONSTATE:
      return {
        ...state,
        buttonState: action.payload,
        loadedState: action.payload
      }

    case SET_AUTH_PAGE:
      return {
        ...state,
        authPage: action.payload
      }

    case SET_CURRENT_USER:
      return {
        ...state,
        userId: action.id,
        userName: action.payload
      }

    case SET_BUTTONSTATE:
      return {
        ...state,
        buttonState: action.payload
      }

    case SET_ANSWERSTATE:
      return {
        ...state,
        answerState: action.payload
      }

    case SET_LOADEDSTATE:
      return {
        ...state,
        answerState: action.payload
      }

    case INIT_BUTTONSTATE:
      return {
        ...state,
        buttonState: action.payload.buttonState,
        answerState: action.payload.answerState,
        loadedState: action.payload.buttonState
      }

    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        isAdmin: false,
        authPage: true
      }

    default:
      return state
  }
}