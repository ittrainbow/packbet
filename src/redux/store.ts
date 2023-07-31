import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { createReduxHistoryContext } from 'redux-first-history'
import { createBrowserHistory } from 'history'

import { appSlice, aboutSlice } from './slices'
import { rootSaga } from './sagas/rootSaga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

const sagaMiddleware = createSagaMiddleware()
const {
  createReduxHistory,
  routerMiddleware,
  routerReducer: router
} = createReduxHistoryContext({
  history: createBrowserHistory()
})

export const store: ToolkitStore = configureStore({
  reducer: combineReducers({
    router,
    app: appSlice.reducer,
    about: aboutSlice.reducer
  }),
  middleware: [routerMiddleware, sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development'
})

export const history = createReduxHistory(store)

sagaMiddleware.run(rootSaga)
