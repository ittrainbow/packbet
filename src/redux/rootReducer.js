import { combineReducers } from 'redux'
import weekReducer from './reducers/weekReducer'
import authReducer from './reducers/authReducer'
import editorReducer from './reducers/editorReducer'
import loadingReducer from './reducers/loadingReducer'
import othersReducer from './reducers/othersReducer'
import renderReducer from './reducers/renderReducer'

export default combineReducers({
  week: weekReducer,
  auth: authReducer,
  editor: editorReducer,
  loading: loadingReducer,
  others: othersReducer,
  render: renderReducer
})