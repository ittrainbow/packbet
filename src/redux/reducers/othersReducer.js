import { SWITCH_YOURSELF, SEE_OTHER_USER, CLEAN_OTHER_USER, GET_OTHER_NAME } from '../types'

const initialState = {
  isItYou: true,
  buttons: null,
  name: null
}

export default function othersReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_YOURSELF:
      return {
        ...state,
        isItYou: action.payload
      }

    case SEE_OTHER_USER:
      return {
        ...state,
        buttons: action.payload
      }

    case GET_OTHER_NAME:
      return {
        ...state,
        name: action.payload
      }

    case CLEAN_OTHER_USER:
      return {
        ...state,
        isItYou: true,
        buttonState: null,
        name: null
      }

    default:
      return state
  }
}
