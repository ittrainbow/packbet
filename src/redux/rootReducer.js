import { SET_MOBILE, SET_LOADING } from './types'

const initialState = {
  mobile: false,
  loading: true
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

    default:
      return state
  }
}
