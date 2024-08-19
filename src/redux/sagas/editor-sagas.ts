import { call, put, select, takeEvery } from 'redux-saga/effects'

import { deleteDBDocument, writeDBDocument } from '../../db'
import { Action, Week, Weeks } from '../../types'
import { getWeeksIDs } from '../../utils'
import { appActions, editorActions, weeksActions } from '../slices'
import { DELETE_WEEK, SUBMIT_WEEK } from '../storetypes'

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
    // yield put(editorActions.clearEditor())
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

export function* editorSagas() {
  yield takeEvery(SUBMIT_WEEK, submitWeekSaga)
  yield takeEvery(DELETE_WEEK, deleteWeekSaga)
}
