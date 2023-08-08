import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { createReduxHistoryContext } from 'redux-first-history'
import { createBrowserHistory } from 'history'

import {
  appSlice,
  aboutSlice,
  standingsSlice,
  userSlice,
  answersSlice,
  resultsSlice,
  compareSlice,
  weeksSlice,
  editorSlice
} from './slices'
import { rootSaga } from './sagas/rootSaga'

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer: router
} = createReduxHistoryContext({
  history: createBrowserHistory()
})

const sagaMiddleware = createSagaMiddleware()

export const store: ToolkitStore = configureStore({
  reducer: combineReducers({
    router,
    app: appSlice.reducer,
    about: aboutSlice.reducer,
    standings: standingsSlice.reducer,
    user: userSlice.reducer,
    answers: answersSlice.reducer,
    results: resultsSlice.reducer,
    weeks: weeksSlice.reducer,
    compare: compareSlice.reducer,
    editor: editorSlice.reducer
  }),
  middleware: [routerMiddleware, sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development'
})

export const history = createReduxHistory(store)

sagaMiddleware.run(rootSaga)
