import { take, all, call, put, select } from 'redux-saga/effects'

import { getWeeksIDs, tableCreator } from '../../helpers'
import { getDBCollection } from '../../db'
import { INIT_APP } from '../storetypes'
import { IAbout, IUserStandings, IWeeks, AnswersType, IAnswers, RawUser, IStore } from '../../types'
import { appActions, aboutActions, standingsActions, weeksActions, resultsActions } from '../slices'

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
    const response: AnswersType = yield call(getDBCollection, 'results')
    yield put(resultsActions.setResults(response))
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

function* fetchStandingsSaga() {
  try {
    const results: AnswersType = yield select((store: IStore) => store.results)
    const answers: IAnswers = yield call(getDBCollection, 'answers')
    const players: { [key: string]: RawUser } = yield call(getDBCollection, 'users')
    const standingsArray: IUserStandings[] = tableCreator(answers, players, results)

    const standings = Object.assign({}, standingsArray)
    yield put(standingsActions.setStandings(standings))
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
    yield all([fetchAboutSaga(), fetchWeeksSaga(), fetchResultsSaga()])
    yield call(fetchStandingsSaga)
    yield put(appActions.setLoading(false))
  }
}
