import { 
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_ADMIN,
  SET_CURRENT_USER,
  GET_BUTTONSTATE,
  SET_BUTTONSTATE,
  SET_ANSWERS,
  SET_AUTH_PAGE
} from '../types'

const initialState = {
  token: null,
  userName: null,
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

    case SET_ANSWERS:
      return {
        ...state,
        answerState: action.payload
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