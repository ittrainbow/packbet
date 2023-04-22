const initialState = {
  mobile: false,
  loading: true,
  editor: false
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOBILE':
      return {
        ...state,
        mobile: action.payload
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }

    case 'SET_EDITOR':
      return {
        ...state,
        editor: action.payload
      }

    default:
      return state
  }
}
