import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'

import { getDBCollection } from '../../db'
import {
  About,
  Answers,
  AnswersStore,
  FetchedStandings,
  OldStandings,
  Store,
  Users,
  UserStandings,
  Weeks
} from '../../types'
import { getTableOnInit, getWeeksIDs } from '../../utils'
import { aboutActions, appActions, resultsActions, standingsActions, weeksActions } from '../slices'
import { INIT_APP, UPDATE_STANDINGS } from '../storetypes'

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

export function* createStandingsSaga() {
  try {
    const { lastSeasonLastWeek } = yield select((store: Store) => store.app)
    const users: Users = yield call(getDBCollection, 'users')
    const answers: AnswersStore = yield call(getDBCollection, 'answers')
    const results: Answers = yield select((store: Store) => store.results)
    const fetchedStandings: FetchedStandings = yield call(getDBCollection, 'standings')

    const weeks: Weeks = yield call(getDBCollection, 'weeks')
    const lastWeek = Number(Object.keys(weeks).slice(-1))

    yield put(appActions.setSelectedWeek(lastWeek))
    yield put(weeksActions.setWeeks(weeks))
    yield put(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))

    const season2022: OldStandings[] = Object.values(fetchedStandings.season2022)

    const season2023: UserStandings[] = Object.values(fetchedStandings.season2023)

    const week2023: UserStandings[] = Object.values(fetchedStandings.week2023)

    const season2024: UserStandings[] = getTableOnInit({
      answers,
      users,
      results,
      lastSeasonLastWeek,
      fullSeason: true
    })

    const week2024: UserStandings[] = getTableOnInit({
      answers,
      users,
      results,
      lastSeasonLastWeek,
      fullSeason: false
    })

    const markedStandings = { season2022, season2023, week2023, season2024, week2024 }

    yield call(setStandingsSaga, markedStandings)
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
    yield all([fetchAboutSaga(), fetchResultsSaga(), createStandingsSaga()])
    yield put(appActions.setLoading(false))
    yield takeEvery(UPDATE_STANDINGS, createStandingsSaga)
  }
}
