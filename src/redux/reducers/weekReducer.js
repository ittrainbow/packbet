import {   
  APP_INIT, 
  SET_WEEK_ID, 
  SET_CURRENT_WEEK,
  SET_EDITOR_STATUS
} from '../types.js';

const initialState = {
  editorStatus: 'editor'
};

export default function weekReducer(state = initialState, action) {
  switch(action.type) {
    case APP_INIT:
      return {
        ...state,
        weeks: action.payload,
        currentweek: action.payload.length - 1
      };
    
    case SET_WEEK_ID:
      return {
        ...state,
        weekId: action.payload
      };

    case SET_EDITOR_STATUS:
      return {
        ...state,
        editorStatus: action.payload
      };
    
    case SET_CURRENT_WEEK:
      return {
        ...state,
        currentweek: action.payload
      };

    default: 
      return state;
  }
};