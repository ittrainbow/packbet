import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createReduxHistoryContext } from 'redux-first-history'
import { createBrowserHistory } from 'history'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './sagas/rootSaga'
import * as slices from './slices'

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
    app: slices.appSlice.reducer,
    about: slices.aboutSlice.reducer,
    standings: slices.standingsSlice.reducer,
    user: slices.userSlice.reducer,
    answers: slices.answersSlice.reducer,
    results: slices.resultsSlice.reducer,
    weeks: slices.weeksSlice.reducer,
    compare: slices.compareSlice.reducer,
    editor: slices.editorSlice.reducer,
    tools: slices.toolsSlice.reducer
  }),
  middleware: [routerMiddleware, sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development'
})

export const history = createReduxHistory(store)

sagaMiddleware.run(rootSaga)
