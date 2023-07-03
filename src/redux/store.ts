import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { createReduxHistoryContext } from 'redux-first-history'
import { createBrowserHistory } from 'history'

import { appReducer as app } from './reducers/appReducer'
import { rootSaga } from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const { createReduxHistory, routerMiddleware, routerReducer: router } = createReduxHistoryContext({
  history: createBrowserHistory()
})

export const store = configureStore({
  reducer: combineReducers({
    router,
    app
  }),
  middleware: [routerMiddleware, sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development'
})

export const history = createReduxHistory(store)

sagaMiddleware.run(rootSaga)