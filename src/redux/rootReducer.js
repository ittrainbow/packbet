import { combineReducers } from 'redux'
import { appReducer as app } from './reducers/appReducer'

export const rootReducer = combineReducers({ app })