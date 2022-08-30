import { combineReducers } from 'redux'
import weekReducer from './reducers/weekReducer'
import authReducer from './reducers/authReducer'
import editorReducer from './reducers/editorReducer'
import loadingReducer from './reducers/loadingReducer'

export default combineReducers({
  week: weekReducer,
  auth: authReducer,
  editor: editorReducer,
  loading: loadingReducer
})