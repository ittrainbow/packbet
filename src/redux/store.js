import { configureStore } from '@reduxjs/toolkit'

import { rootReducer as reducer } from './rootReducer'

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development'
})
