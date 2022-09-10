import { SET_VIEW, TOGGLE_SIDEBAR } from "../types"

const initialState = {
  mobile: false,
  isOpen: false
}

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIEW:
      return {
        ...state,
        mobile: action.payload
      }

    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: action.payload
      }

    default:
      return state
  }
}