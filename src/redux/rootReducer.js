import { SET_MOBILE } from './types'

const initialState = {
  mobile: false
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOBILE:
      return {
        ...state,
        mobile: action.payload
      }

    default:
      return state
  }
}
