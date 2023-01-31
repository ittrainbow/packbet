import { SET_MOBILE, SET_LOADING, SET_EDITOR, SET_COMPARE } from './types'

const initialState = {
  mobile: false,
  loading: true,
  editor: false,
  compareData: ''
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOBILE:
      return {
        ...state,
        mobile: action.payload
      }

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case SET_EDITOR:
      return {
        ...state,
        editor: action.payload
      }

    case SET_COMPARE:
      return {
        ...state,
        compareData: action.payload
      }

    default:
      return state
  }
}
