import { call, put, select, takeEvery } from 'redux-saga/effects'

import { deleteDBDocument, writeDBDocument } from '../../db'
import { Action, Week, Weeks } from '../../types'
import { getWeeksIDs } from '../../utils'
import { appActions, editorActions } from '../slices'
import { DELETE_WEEK, SUBMIT_WEEK } from '../storetypes'

type WeekUpdate = {
  id: number
  week: Week
}

function* setNextAndCurrentWeeksSaga() {
  const weeks: Weeks = yield select((store) => store.weeks)
  yield put(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
}

function* submitWeekSaga(action: Action<WeekUpdate>) {
  const { payload } = action
  const { id, week } = payload
  yield put(appActions.setLoading(true))
  try {
    yield call(writeDBDocument, 'weeks', id, week)
    yield call(setNextAndCurrentWeeksSaga)
    yield put(editorActions.clearEditor())
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
    yield call(deleteDBDocument, 'weeks', weekId)
    yield call(deleteDBDocument, 'results', weekId)
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
