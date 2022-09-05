import {
  APP_INIT,
  SET_WEEK_ID,
  SET_CURRENT_WEEK,
  SET_EDITOR_STATUS,
  SET_STANDINGS
} from '../types.js'

const initialState = {
  editorStatus: 'results'
}

export default function weekReducer(state = initialState, action) {
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
        weeks: action.payload,
        currentWeek: action.payload.length - 1,
        weekId: action.payload.length - 1
      }

    case SET_STANDINGS:
      return {
        ...state,
        standings: action.payload
      }

    case SET_WEEK_ID:
      return {
        ...state,
        weekId: action.payload
      }

    case SET_EDITOR_STATUS:
      return {
        ...state,
        editorStatus: action.payload
      }

    case SET_CURRENT_WEEK:
      return {
        ...state,
        currentWeek: action.payload
      }

    default:
      return state
  }
}
