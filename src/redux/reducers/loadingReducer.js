import { SWITCH_LOADING } from "../types"

const initialState = {
  loading: false,
  message: '',
  isTouched: false
}

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    default: 
      return state
  }

}