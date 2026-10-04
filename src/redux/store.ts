import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './sagas'
import * as slices from './slices'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: combineReducers({
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false
    }).concat(sagaMiddleware),
  devTools: import.meta.env.DEV
})

export type AppDispatch = typeof store.dispatch

sagaMiddleware.run(rootSaga)
