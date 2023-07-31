import { take, all, call, put } from 'redux-saga/effects'

import { getWeeksIDs } from '../../helpers'
import { fetchDataFromFirestore } from '../../db'
import { INIT_APP } from '../types'
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
import { appActions } from '../slices/appSlice'
import { aboutActions } from '../slices'

const season = 2023

function* fetchAboutSaga(setAboutContext: SetAboutContextType) {
  try {
    const about: IAboutContext = yield call(fetchDataFromFirestore, 'about')
    console.log(0, about)
    yield put(aboutActions.setAbout(about))
    setAboutContext(about)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
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
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
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
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* fetchUsersSaga(setUserListContext: SetUserListContextType) {
  try {
    const users: IUserListContext = yield call(fetchDataFromFirestore, 'users')
    setUserListContext(users)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* initSaga() {
  while (true) {
    const { payload } = yield take(INIT_APP)
    yield put(appActions.setLoading(true))
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
    yield put(appActions.setLoading(false))
  }
}
