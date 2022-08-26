import { combineReducers } from 'redux';
import weekReducer from './reducers/weekReducer';
import authReducer from './reducers/authReducer';

export default combineReducers({
  week: weekReducer,
  auth: authReducer
});