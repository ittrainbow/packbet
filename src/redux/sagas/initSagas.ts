import { take, all, call, put } from 'redux-saga/effects'

import { getWeeksIDs, tableCreator } from '../../helpers'
import { fetchDataFromFirestore } from '../../db'
import { INIT_APP } from '../types'
import {
  IAbout,
  IAnswersContext,
  IUserListContext,
  IUserStandings,
  IWeeksContext,
  SetAnswersContextType,
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

function* fetchWeeksSaga(
  setWeeksContext: SetWeeksContextType,
  setAnswersContext: SetAnswersContextType,
  setCompareContext: SetAnswersContextType,
  setUserListContext: SetUserListContextType
) {
  try {
    const weeks: IWeeksContext = yield call(fetchDataFromFirestore, `weeks${season}`)
    const answers: IAnswersContext = yield call(fetchDataFromFirestore, `answers${season}`)
    const users: IUserListContext = yield call(fetchDataFromFirestore, 'users')

    const standings: IUserStandings[] = tableCreator(answers, users)

    setUserListContext(users)

    setWeeksContext(weeks)
    yield put(appActions.setSeason(season))
    yield put(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))

    setAnswersContext(answers)
    setCompareContext(structuredClone(answers))

    yield put(standingsActions.setStandings(standings))
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
      setWeeksContext,
      setAnswersContext,
      setCompareContext,
      setUserListContext
    } = payload
    yield all([
      fetchAboutSaga(),
      fetchWeeksSaga(setWeeksContext, setAnswersContext, setCompareContext, setUserListContext),
    ])
    yield put(appActions.setLoading(false))
  }
}
