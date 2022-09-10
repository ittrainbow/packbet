import { SET_VIEW, TOGGLE_SIDEBAR, SET_TAB_ACTIVE } from "../types"

const initialState = {
  mobile: false,
  isOpen: false,
  tabActive: 0
}

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIEW:
      return {
        ...state,
        mobile: action.payload
      }

    case SET_TAB_ACTIVE:
      return {
        ...state,
        tabActive: action.payload
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