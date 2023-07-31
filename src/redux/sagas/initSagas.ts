import { take, all, call, put } from 'redux-saga/effects'

import { getWeeksIDs, tableCreator } from '../../helpers'
import { fetchDataFromFirestore } from '../../db'
import { INIT_APP } from '../types'
import {
  IAbout,
  // IAboutContext,
  IAnswersContext,
  IApp,
  IUserListContext,
  IUserStandings,
  IWeeksContext,
  // SetAboutContextType,
  SetAnswersContextType,
  // SetAppContextType,
  SetUserListContextType,
  SetWeeksContextType
} from '../../types'
import { appActions } from '../slices/appSlice'
import { aboutActions } from '../slices'
import { standingsActions } from '../slices/standingsSlice'

const season = 2023

function* fetchAboutSaga() {
  try {
    const about: IAbout = yield call(fetchDataFromFirestore, 'about')
    yield put(aboutActions.setAbout(about))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* fetchStandingsSaga() {

}

function* fetchWeeksSaga(
  // appContext: IApp,
  // setAppContext: SetAppContextType,
  setWeeksContext: SetWeeksContextType,
  setAnswersContext: SetAnswersContextType,
  setCompareContext: SetAnswersContextType,
  setUserListContext: SetUserListContextType
) {
  try {
    const weeks: IWeeksContext = yield call(fetchDataFromFirestore, `weeks${season}`)
    const answers: IAnswersContext = yield call(fetchDataFromFirestore, `answers${season}`)
    console.log(100, answers)
    const users: IUserListContext = yield call(fetchDataFromFirestore, 'users')

    const standings: IUserStandings[] = tableCreator(answers, users)
    const { currentWeek, newNextWeek } = getWeeksIDs(weeks)

    setUserListContext(users)

    setWeeksContext(weeks)
    // setAppContext({ ...appContext, currentWeek, nextWeek: newNextWeek, season })
    yield put(appActions.setSeason(season))
    yield put(appActions.setNextAndCurrentWeeks({ currentWeek, nextWeek: newNextWeek }))
    // yield put(appActions.setNextWeek(newNextWeek))

    setAnswersContext(answers)
    setCompareContext(structuredClone(answers))

    yield put(standingsActions.setStandings(standings))
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
  // try {
  //   const answers: IAnswersContext = yield call(fetchDataFromFirestore, `answers${season}`)
  //   setAnswersContext(answers)
  //   setCompareContext(structuredClone(answers))
  // } catch (error) {
  //   if (error instanceof Error) {
  //     yield put(appActions.setError(error.message))
  //   }
  // }
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
      // setAboutContext,
      // appContext,
      // setAppContext,
      setWeeksContext,
      setAnswersContext,
      setCompareContext,
      setUserListContext
    } = payload
    yield all([
      fetchAboutSaga(),
      fetchWeeksSaga(setWeeksContext, setAnswersContext, setCompareContext, setUserListContext),
      fetchAnswersSaga(setAnswersContext, setCompareContext),
      fetchUsersSaga(setUserListContext)
    ])
    yield put(appActions.setLoading(false))
  }
}
