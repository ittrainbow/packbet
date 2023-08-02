import { take, all, call, put } from 'redux-saga/effects'

import { getWeeksIDs } from '../../helpers'
import { getCollectionFromDB, getDocumentFromDB } from '../../db'
import { INIT_APP } from '../storetypes'
import {
  IAbout,
  IFetchObject,
  IUserStandings,
  IWeeks
} from '../../types'
import { appActions, aboutActions, standingsActions, weeksActions } from '../slices'

function* fetchAboutSaga() {
  try {
    const about: IAbout = yield call(getCollectionFromDB, 'about')
    yield put(aboutActions.setAbout(about))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* fetchWeeksSaga() {
  try {
    const weeks: IWeeks = yield call(getCollectionFromDB, 'weeks2023')
    const lastWeek = Number(Object.keys(weeks).slice(-1))
    yield put(appActions.setSelectedWeek(lastWeek))
    yield put(weeksActions.setWeeks(weeks))

    const response: IFetchObject<IUserStandings> = yield call(getDocumentFromDB, 'results2023', 'standings')
    const standings = Object.values(response)

    yield put(standingsActions.setStandings(standings))
    yield put(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* initSaga() {
  while (true) {
    yield take(INIT_APP)
    yield put(appActions.setLoading(true))
    yield all([
      fetchAboutSaga(),
      fetchWeeksSaga(),
    ])
    yield put(appActions.setLoading(false))
  }
}
