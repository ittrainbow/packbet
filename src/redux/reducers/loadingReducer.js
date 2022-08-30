import { SWITCH_LOADING } from "../types";

const initialState = {
  loading: false,
  message: ''
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    default: 
      return state;
  };

}