import { SET_LOADING, SET_MOBILE, SET_EDITOR, SET_ERROR } from '../types'

const initialState = {
  mobile: false,
  loading: true,
  editor: false,
  error: null
}

export const appReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_MOBILE:
      return {
        ...state,
        mobile: payload
      }

    case SET_LOADING:
      return {
        ...state,
        loading: payload
      }

    case SET_EDITOR:
      return {
        ...state,
        editor: payload
      }

    case SET_ERROR:
      return {
        ...state,
        error: payload
      }

    default:
      return state
  }
}
