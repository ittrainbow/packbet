import { SWITCH_LOADING } from "../types";

const initialState = {
  loading: false
}

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_LOADING:
      return {
        loading: action.loading
      }

    default: 
      return state
  }

}