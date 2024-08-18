import { all, call, put, select, take } from 'redux-saga/effects'

import { getDBCollection } from '../../db'
import {
  About,
  Answers,
  AnswersStore,
  FetchedStandings,
  Standings,
  Store,
  Users,
  UserStandings,
  Weeks
} from '../../types'
import { getTableOnInit, getWeeksIDs } from '../../utils'
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

// function* fetchWeeksSaga() {
//   try {
//     const weeks: Weeks = yield call(getDBCollection, 'weeks')
//     const lastWeek = Number(Object.keys(weeks).slice(-1))
//     yield put(appActions.setSelectedWeek(lastWeek))
//     yield put(weeksActions.setWeeks(weeks))
//     yield put(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
//   } catch (error) {
//     if (error instanceof Error) {
//       yield put(appActions.setError(error.message))
//     }
//   }
// }

export function* fetchStandingsOnInitSaga() {
  try {
    const { app } = yield select((store: Store) => store)
    const users: Users = yield call(getDBCollection, 'users')
    const answers: AnswersStore = yield call(getDBCollection, 'answers')
    const results: Answers = yield select((store: Store) => store.results)
    const standings: FetchedStandings = yield call(getDBCollection, 'standings')

    const weeks: Weeks = yield call(getDBCollection, 'weeks')
    const lastWeek = Number(Object.keys(weeks).slice(-1))

    yield put(appActions.setSelectedWeek(lastWeek))
    yield put(weeksActions.setWeeks(weeks))
    yield put(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))

    const seasonArray: UserStandings[] = getTableOnInit({
      answers,
      users,
      results,
      weeks,
      seasonStartTime: app.seasonStartTime,
      fullSeason: true
    })
    const weekArray: UserStandings[] = getTableOnInit({
      answers,
      users,
      results,
      weeks,
      seasonStartTime: app.seasonStartTime,
      fullSeason: false
    })

    const markedStandings = { ...standings, season2024: seasonArray, week2024: weekArray }

    yield call(setStandingsSaga, markedStandings)
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

export function* setStandingsSaga(standings: any) {
  yield put(standingsActions.setStandings(standings))
}

export function* initSaga() {
  while (true) {
    yield take(INIT_APP)
    yield put(appActions.setLoading(true))
    yield all([fetchAboutSaga(), fetchResultsSaga(), fetchStandingsOnInitSaga()])
    yield put(appActions.setLoading(false))
  }
}
