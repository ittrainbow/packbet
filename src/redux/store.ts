import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { appSlice, aboutSlice, standingsSlice, userSlice, answersSlice, resultsSlice, compareSlice, weeksSlice } from './slices'
import { rootSaga } from './sagas/rootSaga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

const sagaMiddleware = createSagaMiddleware()

export const store: ToolkitStore = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    about: aboutSlice.reducer,
    standings: standingsSlice.reducer,
    user: userSlice.reducer,
    answers: answersSlice.reducer,
    results: resultsSlice.reducer,
    weeks: weeksSlice.reducer,
    compare: compareSlice.reducer
  }),
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV === 'development'
})

sagaMiddleware.run(rootSaga)
