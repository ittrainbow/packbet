import {   
  APP_INIT, 
  SET_WEEK_ID, 
  SET_CURRENT_WEEK,
  SET_BUTTONSTATE
} from '../types.js';

const initialState = {};

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
        weekid: action.payload
      };

    case SET_BUTTONSTATE:
      return {
        ...state,
        buttonstate: action.payload
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