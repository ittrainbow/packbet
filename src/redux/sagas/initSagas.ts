import { take, all, call, put } from 'redux-saga/effects'

import { getWeeksIDs } from '../../helpers'
import { fetchDataFromFirestore } from '../../db/api'
import { setLoading, setError } from './generators'
import { INIT_APP, SET_ERROR } from '../types'
import {
  IAboutContext,
  IAnswersContext,
  IAppContext,
  IUserListContext,
  IWeeksContext,
  SetAboutContextType,
  SetAnswersContextType,
  SetAppContextType,
  SetUserListContextType,
  SetWeeksContextType
} from '../../types'

const season = 2023

function* fetchAboutSaga(setAboutContext: SetAboutContextType) {
  try {
    const about: IAboutContext = yield call(fetchDataFromFirestore, 'about')
    setAboutContext(about)
  } catch (error) {
    if (error instanceof Error) yield setError(error)
  }
}

function* fetchWeeksSaga(
  appContext: IAppContext,
  setAppContext: SetAppContextType,
  setWeeksContext: SetWeeksContextType
) {
  try {
    const weeks: IWeeksContext = yield call(fetchDataFromFirestore, `weeks${season}`)
    const { currentWeek, nextWeek } = getWeeksIDs(weeks)

    setWeeksContext(weeks)
    setAppContext({ ...appContext, currentWeek, nextWeek, season })
  } catch (error) {
    if (error instanceof Error) yield setError(error)
  }
}

function* fetchAnswersSaga(
  setAnswersContext: SetAnswersContextType,
  setCompareContext: SetAnswersContextType
) {
  try {
    const answers: IAnswersContext = yield call(fetchDataFromFirestore, `answers${season}`)
    setAnswersContext(answers)
    setCompareContext(structuredClone(answers))
  } catch (error) {
    if (error instanceof Error) yield setError(error)
  }
}

function* fetchUsersSaga(setUserListContext: SetUserListContextType) {
  try {
    const users: IUserListContext = yield call(fetchDataFromFirestore, 'users')
    setUserListContext(users)
  } catch (error) {
    if (error instanceof Error) yield setError(error)
  }
}

export function* initSaga() {
  while (true) {
    const { payload } = yield take(INIT_APP)
    const {
      setAboutContext,
      appContext,
      setAppContext,
      setWeeksContext,
      setAnswersContext,
      setCompareContext,
      setUserListContext
    } = payload
    yield all([
      fetchAboutSaga(setAboutContext),
      fetchWeeksSaga(appContext, setAppContext, setWeeksContext),
      fetchAnswersSaga(setAnswersContext, setCompareContext),
      fetchUsersSaga(setUserListContext)
    ])
    yield setLoading(false)
  }
}
