import { combineReducers } from 'redux'
import { appReducer as app } from './appReducer'

export const rootReducer = combineReducers({ app })