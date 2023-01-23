import { SWITCH_LOADING, SET_MESSAGE } from '../types'

const initialState = {
  loading: false,
  message: ''
}

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      }

    default:
      return state
  }
}
