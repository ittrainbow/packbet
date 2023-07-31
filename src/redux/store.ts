import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { appSlice, aboutSlice, standingsSlice } from './slices'
import { rootSaga } from './sagas/rootSaga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

const sagaMiddleware = createSagaMiddleware()

export const store: ToolkitStore = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    about: aboutSlice.reducer,
    standings: standingsSlice.reducer
  }),
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development'
})

sagaMiddleware.run(rootSaga)
