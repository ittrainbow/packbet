import { SWITCH_YOURSELF, SEE_OTHER_USER, CLEAN_OTHER_USER } from '../types'

const initialState = {
  isItYou: true,
  buttonState: null
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
        buttonState: action.payload
      }

    case CLEAN_OTHER_USER:
      return {
        ...state,
        buttonState: null
      }

    default:
      return state
  }
}
