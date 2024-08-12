import { all, call, put, take } from 'redux-saga/effects'

import { getDBCollection } from '../../db'
import { About, Answers, Standings, Weeks } from '../../types'
import { getWeeksIDs } from '../../utils'
import { aboutActions, appActions, resultsActions, standingsActions, weeksActions } from '../slices'
import { INIT_APP } from '../storetypes'

function* fetchAboutSaga() {
  try {
    const about: About = yield call(getDBCollection, 'about')
    yield put(aboutActions.setAbout(about))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* fetchResultsSaga() {
  try {
    const results: Answers = yield call(getDBCollection, 'results')
    yield put(resultsActions.setResults(results))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* fetchWeeksSaga() {
  try {
    const weeks: Weeks = yield call(getDBCollection, 'weeks')
    const lastWeek = Number(Object.keys(weeks).slice(-1))
    yield put(appActions.setSelectedWeek(lastWeek))
    yield put(weeksActions.setWeeks(weeks))
    yield put(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* fetchStandingsSaga() {
  try {
    const standings: Standings = yield call(getDBCollection, 'standings')

    yield call(setStandingsSaga, standings)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* setStandingsSaga(standings: Standings) {
  yield put(standingsActions.setStandings(standings))
}

export function* initSaga() {
  while (true) {
    yield take(INIT_APP)
    yield put(appActions.setLoading(true))
    yield all([fetchAboutSaga(), fetchWeeksSaga(), fetchResultsSaga(), fetchStandingsSaga()])
    yield put(appActions.setLoading(false))
  }
}
