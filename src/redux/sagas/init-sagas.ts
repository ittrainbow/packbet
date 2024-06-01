import { all, call, put, select, take } from 'redux-saga/effects'

import { getDBCollection } from '../../db'
import { AnswersType, IAbout, IStandings, IStore, IWeeks } from '../../types'
import { getWeeksIDs } from '../../utils'
import { aboutActions, appActions, resultsActions, standingsActions, weeksActions } from '../slices'
import { INIT_APP } from '../storetypes'

function* fetchAboutSaga() {
  try {
    const about: IAbout = yield call(getDBCollection, 'about')
    yield put(aboutActions.setAbout(about))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* fetchResultsSaga() {
  try {
    const results: AnswersType = yield call(getDBCollection, 'results')
    yield put(resultsActions.setResults(results))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* fetchWeeksSaga() {
  try {
    const weeks: IWeeks = yield call(getDBCollection, 'weeks')
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
    const { app } = yield select((store: IStore) => store)
    const standings: IStandings = yield call(getDBCollection, `standings-${app.season}`)
    yield call(setStandingsSaga, standings)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* setStandingsSaga(standings: IStandings) {
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
