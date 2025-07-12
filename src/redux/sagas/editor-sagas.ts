import { call, put, select, takeEvery } from 'redux-saga/effects'

import { deleteDBDocument, getDBCollection, writeDBDocument } from '../../db'
import { Action, Answers, AnswersStore, Store, Users, Week, Weeks } from '../../types'
import { createTable, getWeeksIDs } from '../../utils'
import { appActions, editorActions, weeksActions } from '../slices'
import { DELETE_WEEK, SUBMIT_WEEK, UPDATE_STANDINGS } from '../storetypes'
import { createStandingsFromDBSaga } from './init-sagas'

type WeekUpdate = {
  id: number
  week: Week
  isNewWeek: boolean
  toaster: (value: boolean) => void
}

function* setNextAndCurrentWeeksSaga() {
  const weeks: Weeks = yield select((store) => store.weeks)
  yield put(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
}

function* submitWeekSaga(action: Action<WeekUpdate>) {
  const { payload } = action
  const { id, week, isNewWeek, toaster } = payload
  yield put(appActions.setLoading(true))
  try {
    yield call(writeDBDocument, 'weeks', id, week)
    if (isNewWeek) yield call(setNextAndCurrentWeeksSaga)
    yield put(weeksActions.updateWeeks({ id, week }))
    yield call(toaster, true)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
  yield put(appActions.setLoading(false))
}

function* deleteWeekSaga(action: Action<number>) {
  const weekId = action.payload
  yield put(appActions.setLoading(true))
  try {
    yield call(deleteDBDocument, 'weeks', weekId.toString())
    yield call(deleteDBDocument, 'results', weekId.toString())
    yield call(setNextAndCurrentWeeksSaga)
    yield put(editorActions.clearEditor())
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
  yield put(appActions.setLoading(false))
}

export function* updateStandingsSaga() {
  yield put(appActions.setLoading(true))

  const users: Users = yield call(getDBCollection, 'users')
  const answers: AnswersStore = yield call(getDBCollection, 'answers')
  const results: Answers = yield select((store: Store) => store.results)
  const { lastSeasonLastWeek } = yield select((state) => state.app)
  const weekTable = createTable({ answers, users, results, fullSeason: false, lastSeasonLastWeek })
  const seasonTable = createTable({ answers, users, results, fullSeason: true, lastSeasonLastWeek })

  yield call(writeDBDocument, 'standings', 'week2025', Object.fromEntries(weekTable.map((el, index) => [index, el])))
  yield call(
    writeDBDocument,
    'standings',
    'season2025',
    Object.fromEntries(seasonTable.map((el, index) => [index, el]))
  )
  const { week2passed } = yield select((store: Store) => store.app)
  yield week2passed && call(createStandingsFromDBSaga)

  yield put(appActions.setLoading(false))
}

export function* editorSagas() {
  yield takeEvery(SUBMIT_WEEK, submitWeekSaga)
  yield takeEvery(DELETE_WEEK, deleteWeekSaga)
  yield takeEvery(UPDATE_STANDINGS, updateStandingsSaga)
}
